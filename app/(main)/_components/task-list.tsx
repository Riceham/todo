"use client";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

import { reorder } from "@/lib/utils";

import { Subtask } from "./subtask";
import { Task } from "./task";

type TaskListProps = {
  todos: Readonly<
    {
      id: string;
      task: string;
    }[]
  >;
  type?: "subtasks" | "tasks";
};

export const TaskList = ({ todos, type = "tasks" }: TaskListProps) => {
  const [orderedTodos, setOrderedTodos] = useState(todos);

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="card" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {orderedTodos.map((todo, i) => {
              return type === "tasks" ? (
                <Task key={todo.id} index={i} todo={todo} />
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
