"use client";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";
import type { SubTask } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateTodoOrder } from "@/actions/update-todo-order";
import { useAction } from "@/hooks/use-action";
import { reorder } from "@/lib/utils";

import { Subtask } from "./subtask";

type TaskListProps = {
  todos: SubTask[];
  workspaceId: string;
  todoId: string;
};

export const SubTaskList = ({ workspaceId, todos, todoId }: TaskListProps) => {
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

    // executeUpdateTodoOrder({ todos: items, workspaceId });
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
            {orderedTodos.map((todo, i) => (
              <Subtask
                key={todo.id}
                index={i}
                todo={todo}
                workspaceId={workspaceId}
              />
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
