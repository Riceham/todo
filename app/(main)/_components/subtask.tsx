"use client";

import { Draggable } from "@hello-pangea/dnd";
import type { SubTask } from "@prisma/client";
import { GripVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { updateSubTodo } from "@/actions/update-subtodo";
import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { useEditSubtask } from "@/hooks/use-edit-subtask";
import { cn } from "@/lib/utils";

type SubtaskProps = {
  todo: SubTask;
  index: number;
  workspaceId: string;
};

export const Subtask = ({ todo, index, workspaceId }: SubtaskProps) => {
  const [checked, setChecked] = useState(false);
  const editSubtask = useEditSubtask();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [subtask, setSubtask] = useState(todo.task || "Untitled Subtask");

  const { execute: executeSubTodoUpdate, isLoading } = useAction(
    updateSubTodo,
    {
      onSuccess: (data) => {
        toast.success("Subtask updated.");

        setSubtask(data.task);
        setIsEditing(false);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const enableInput = () => {
    setSubtask(subtask);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    if (subtask === todo.task) return setIsEditing(false);

    executeSubTodoUpdate({
      subtask: {
        id: todo.id,
        todoId: todo.todoId,
        isCompleted: todo.isCompleted,
        task: subtask,
      },
      workspaceId,
    });

    editSubtask.setSubtaskId("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
  };

  useEffect(() => {
    if (todo.id === editSubtask.subtaskId) enableInput();
  }, [todo.id, editSubtask.subtaskId]);

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
                disabled={isLoading}
                aria-disabled={isLoading}
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
                disabled={isLoading}
                aria-disabled={isLoading}
                onClick={enableInput}
                className="flex items-center space-x-2 cursor-text"
              >
                <p className={cn("text-sm", checked && "line-through")}>
                  {subtask}
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
