"use client";

import { formatDistance } from "date-fns";
import { ChevronRight, GripVertical, History } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type TaskProps = {
  todo: {
    id: string;
    task: string;
  };
};

export const Task = ({ todo }: TaskProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <li
      key={todo.id}
      className={cn(
        "flex justify-between items-center p-3 dark:bg-gray-800 bg-gray-100 rounded-md shadow transition dark:hover:bg-gray-700 cursor-default",
        checked && "opacity-50 hover:opacity-60"
      )}
    >
      <div className="flex items-center space-x-2">
        <GripVertical className="h-5 w-5 opacity-80 hover:opacity-100 transition cursor-grab" />
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
        <p className={cn(checked && "line-through")}>{todo.task}</p>
      </div>

      <div className="flex items-center">
        <History className="h-4 w-4 mr-1 text-primary" />
        <p className="text-xs mr-5">
          <strong className="font-semibold">
            {formatDistance(new Date("2024, 4, 26"), new Date("2024, 4, 27"), {
              addSuffix: true,
            })}
          </strong>
        </p>
        <Hint description="Show More" side="left" sideOffset={5}>
          <button>
            <ChevronRight className="h-4 w-4 text-primary" />
          </button>
        </Hint>
      </div>
    </li>
  );
};
