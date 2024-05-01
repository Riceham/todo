"use client";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";
import type { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateTodoOrder } from "@/actions/update-todo-order";
import { useAction } from "@/hooks/use-action";
import { reorder } from "@/lib/utils";

import { Subtask } from "./subtask";
import { Task } from "./task";

type TaskListProps = {
  todos: Todo[];
  type?: "subtasks" | "tasks";
  workspaceId: string;
};

export const TaskList = ({
  workspaceId,
  todos,
  type = "tasks",
}: TaskListProps) => {
  const [orderedTodos, setOrderedTodos] = useState(todos);
  const { execute: executeUpdateTodoOrder, isLoading: isTaskLoading } =
    useAction(updateTodoOrder, {
      onSuccess: () => {
        toast.success("Todo reordered");
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // if no destination
    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type !== "card") return;

    const items = reorder(orderedTodos, source.index, destination.index).map(
      (item, index) => ({ ...item, order: index })
    );

    setOrderedTodos(items);

    executeUpdateTodoOrder({ todos: items, workspaceId });
  };

  useEffect(() => {
    setOrderedTodos(todos);
  }, [todos]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="lists"
        type="card"
        direction="vertical"
        isDropDisabled={isTaskLoading}
      >
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {orderedTodos.map((todo, i) => {
              return type === "tasks" ? (
                <Task
                  key={todo.id}
                  index={i}
                  todo={todo}
                  isLoading={isTaskLoading}
                />
              ) : (
                <Subtask key={todo.id} index={i} todo={todo} />
              );
            })}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
