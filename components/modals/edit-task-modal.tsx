"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ListTodo, Plus, Save, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { deleteTodo } from "@/actions/delete-todo";
import { updateTodo } from "@/actions/update-todo";
import { SubTaskList } from "@/app/(main)/_components/subtask-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useEditTask } from "@/hooks/use-edit-task";
import { useAction } from "@/hooks/use-action";

const formSchema = z.object({
  task: z
    .string()
    .min(1, {
      message: "Task name is required.",
    })
    .max(60, {
      message: "Task name exceeds 60 characters.",
    }),
  description: z
    .string()
    .max(200, {
      message: "Task description exceeds 200 characters.",
    })
    .optional(),
});

export function EditTaskModal() {
  const { isOpen, onClose, task } = useEditTask();
  const [updatedSubtasks, setUpdatedSubtasks] = useState(task.subtasks);
  const router = useRouter();
  const { execute: executeTodoUpdate, isLoading } = useAction(updateTodo, {
    onSuccess: () => {
      toast.success("Todo updated.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeTodoDelete, isLoading: isDeleting } = useAction(
    deleteTodo,
    {
      onSuccess: (data) => {
        toast.success("Todo deleted.");

        handleClose();

        router.push(`/dashboard/${data.workspaceId}`);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    executeTodoUpdate({
      todo: {
        id: task.id,
        workspaceId: task.workspaceId,
        task: values.task.trim(),
        description: (values.description || "").trim(),
      },
    });
  };

  const onDelete = () => {
    executeTodoDelete({ id: task.id, workspaceId: task.workspaceId });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    setUpdatedSubtasks(task.subtasks);
  }, [task.subtasks]);

  useEffect(() => {
    form.setValue("task", task.task);
    form.setValue("description", task?.description || "");
  }, [form, task.task, task.description]);

  return (
    <Sheet open={isOpen || isLoading || isDeleting} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <SquarePen className="h-5 w-5 mr-2 text-primary" />
            Edit Task
            <Badge
              className="ml-2"
              variant={task.isCompleted ? "success" : "default"}
            >
              {task.isCompleted ? "Completed" : "Pending"}
            </Badge>
          </SheetTitle>
          <Separator />
          <SheetDescription>
            Make changes to your <strong className="text-primary">task</strong>{" "}
            here.
            <br />
            Click <strong className="text-primary">Save Changes</strong> when
            you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-6"
            autoCapitalize="off"
            autoComplete="off"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-400">
                      Task
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading || isDeleting}
                        aria-disabled={isLoading || isDeleting}
                        placeholder="Enter task name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-400">
                      Description
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        disabled={isLoading || isDeleting}
                        aria-disabled={isLoading || isDeleting}
                        placeholder="Add a description..."
                        className="resize-none scrollbar h-36"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetHeader className="flex pt-4 justify-between">
              <SheetTitle className="flex justify-between items-center">
                <p className="flex items-center">
                  <ListTodo className="h-5 w-5 mr-2 text-primary" />
                  Subtasks{" "}
                  <span className="text-xs ml-1 text-primary">
                    ({updatedSubtasks.length})
                  </span>
                </p>
                <Button
                  size="icon"
                  onClick={() => {}}
                  className="h-6 w-6"
                  title="Add New Subtask"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add New Subtask</span>
                </Button>
              </SheetTitle>

              <Separator />
            </SheetHeader>
            <ScrollArea className="flex-1 mb-5 pr-2 max-h-48 overflow-y-auto scrollbar">
              {updatedSubtasks.length === 0 ? (
                <div className="flex items-center justify-center">
                  <h3>
                    No <strong className="text-primary">Subtasks</strong> found.
                  </h3>
                </div>
              ) : (
                <SubTaskList
                  todos={updatedSubtasks}
                  workspaceId={task.workspaceId}
                />
              )}
            </ScrollArea>

            <SheetFooter className="py-2 sm:justify-around">
              <Button
                type="button"
                onClick={onDelete}
                variant="destructive"
                disabled={isLoading || isDeleting}
                aria-disabled={isLoading || isDeleting}
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Task
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isDeleting}
                aria-disabled={isLoading || isDeleting}
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
