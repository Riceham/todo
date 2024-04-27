"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ListTodo, Plus, Save, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { TaskList } from "@/app/(main)/_components/task-list";
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
import { SUBTASKS } from "@/constants";
import { useEditTask } from "@/hooks/use-edit-task";

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
  const [updatedSubtasks, setUpdatedSubtasks] = useState(SUBTASKS);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isTaskCompleted = false;

  useEffect(() => {
    form.setValue("task", task.task);
    // TODO: set task description if exists
  }, [form, task.task]);

  return (
    <Sheet open={isOpen || isLoading} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <SquarePen className="h-5 w-5 mr-2 text-primary" />
            Edit Task
            <Badge
              className="ml-2"
              variant={isTaskCompleted ? "success" : "default"}
            >
              {isTaskCompleted ? "Completed" : "Pending"}
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
                        disabled={isLoading}
                        aria-disabled={isLoading}
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
                        disabled={isLoading}
                        aria-disabled={isLoading}
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
              <TaskList todos={updatedSubtasks} type="subtasks" />
            </ScrollArea>

            <SheetFooter className="py-2 sm:justify-around">
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Task
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
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
