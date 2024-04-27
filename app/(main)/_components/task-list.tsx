import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

import { reorder } from "@/lib/utils";

import { Task } from "./task";

type TaskListProps = {
  todos: Readonly<
    {
      id: string;
      task: string;
    }[]
  >;
};

export const TaskList = ({ todos }: TaskListProps) => {
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

  console.log(orderedTodos);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="card" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {orderedTodos.map((todo, i) => (
              <Task key={todo.id} index={i} todo={todo} />
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
