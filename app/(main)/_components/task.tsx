"use client";

import { Draggable } from "@hello-pangea/dnd";
import { formatDistance } from "date-fns";
import { ChevronRight, GripVertical, History } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";
import { useEditTask } from "@/hooks/use-edit-task";
import { cn } from "@/lib/utils";

type TaskProps = {
  todo: {
    id: string;
    task: string;
  };
  index: number;
};

export const Task = ({ todo, index }: TaskProps) => {
  const [checked, setChecked] = useState(false);
  const editTask = useEditTask();

  const handleClick = () => {
    editTask.setTask(todo);
    editTask.onOpen();
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cn(
            "flex space-x-2 items-center p-3 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md select-none shadow transition dark:hover:bg-gray-700",
            checked && "opacity-50 hover:opacity-60",
            editTask.task.id === todo.id && "dark:bg-gray-700 bg-gray-200"
          )}
        >
          <GripVertical className="h-5 w-5 opacity-80 hover:opacity-100 transition" />
          <Hint
            description={checked ? "Mark as pending" : "Mark as complete"}
            side="right"
            sideOffset={2}
          >
            <Checkbox
              className="h-5 w-5"
              checked={checked}
              onCheckedChange={() => setChecked((prevCheck) => !prevCheck)}
            />
          </Hint>
          <div
            role="button"
            onClick={handleClick}
            className="flex justify-between items-center w-full cursor-default"
          >
            <div className="flex items-center space-x-2">
              <p className={cn(checked && "line-through")}>{todo.task}</p>
            </div>

            <div className="flex items-center">
              <History className="h-4 w-4 mr-1 text-primary" />
              <p className="text-xs mr-5">
                <strong className="font-semibold">
                  {formatDistance(
                    new Date("2024, 4, 26"),
                    new Date("2024, 4, 27"),
                    {
                      addSuffix: true,
                    }
                  )}
                </strong>
              </p>
              <Hint description="Show More" side="left" sideOffset={5}>
                <button>
                  <ChevronRight className="h-4 w-4 text-primary" />
                </button>
              </Hint>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
