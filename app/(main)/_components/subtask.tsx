"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { SubTask } from "@prisma/client";
import { GripVertical, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubtaskProps = {
  todo: SubTask;
  index: number;
};

export const Subtask = ({ todo, index }: SubtaskProps) => {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [subtask, setSubtask] = useState(todo.task || "Untitled Subtask");

  const enableInput = () => {
    setSubtask(subtask);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cn(
            "flex space-x-2 items-center p-2 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md select-none shadow transition dark:hover:bg-gray-700",
            checked && "opacity-50 hover:opacity-60"
          )}
        >
          <GripVertical className="h-4 w-4 opacity-80 hover:opacity-100 transition" />
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
          <div className="flex justify-between items-center w-full cursor-default">
            {isEditing ? (
              <Input
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={subtask}
                className="h-7 px-3 mr-2 py-2 bg-background focus-visible:ring-transparent"
              />
            ) : (
              <button
                onClick={enableInput}
                className="flex items-center space-x-2 cursor-text"
              >
                <p className={cn("text-sm", checked && "line-through")}>
                  {todo.task}
                </p>
              </button>
            )}

            <Hint description="Delete Subtask" side="left" sideOffset={5}>
              <button type="button">
                <Trash2 className="h-4 w-4 text-destructive/80 hover:text-destructive transition" />
              </button>
            </Hint>
          </div>
        </li>
      )}
    </Draggable>
  );
};
