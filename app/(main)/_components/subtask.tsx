"use client";

import { formatDistance } from "date-fns";
import { ChevronRight, GripVertical, History, Trash2 } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEditTask } from "@/hooks/use-edit-task";

type SubtaskProps = {
  todo: {
    id: string;
    task: string;
  };
};

export const Subtask = ({ todo }: SubtaskProps) => {
  const [checked, setChecked] = useState(false);
  const editTask = useEditTask();

  const handleClick = () => {
    editTask.setTask(todo);
    editTask.onOpen();
  };

  return (
    <li
      key={todo.id}
      className={cn(
        "flex space-x-2 items-center p-2 dark:bg-gray-800 bg-gray-100 rounded-md shadow transition dark:hover:bg-gray-700",
        checked && "opacity-50 hover:opacity-60"
      )}
    >
      <GripVertical className="h-4 w-4 opacity-80 hover:opacity-100 transition cursor-grab" />
      <Hint
        description={checked ? "Mark as pending" : "Mark as complete"}
        side="right"
        sideOffset={2}
      >
        <Checkbox
          className="h-4 w-4"
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
          <p className={cn("text-sm", checked && "line-through")}>
            {todo.task}
          </p>
        </div>

        <Hint description="Delete Subtask" side="left" sideOffset={5}>
          <button>
            <Trash2 className="h-4 w-4 text-primary" />
          </button>
        </Hint>
      </div>
    </li>
  );
};
