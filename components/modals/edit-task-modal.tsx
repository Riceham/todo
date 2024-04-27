"use client";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListTodo, Plus, Save, SquarePen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Subtask } from "@/app/(main)/_components/subtask";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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

  const onDragEnd = (_result: DropResult) => {};

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.setValue("task", task.task);
  }, [form, task.task]);
  // TODO: set task description if exists

  return (
    <Sheet open={isOpen || isLoading} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <SquarePen className="h-5 w-5 mr-2 text-primary" />
            Edit Task
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

            <SheetHeader className="pt-4">
              <SheetTitle className="flex items-center">
                <ListTodo className="h-5 w-5 mr-2 text-primary" />
                Subtasks <span className="text-xs ml-1 text-primary">(5)</span>
              </SheetTitle>
              <Separator />
            </SheetHeader>

            <Button size="sm" className="self-start mb-5">
              <Plus className="h-4 w-4 mr-2" /> Add New Task
            </Button>
            <ScrollArea className="flex-1 mb-5 pr-2 max-h-48 overflow-y-auto scrollbar">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="lists" type="card" direction="vertical">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {new Array(5).fill("").map((_, i) => (
                        <Subtask
                          key={i + 1}
                          todo={{
                            id: String(i + 1),
                            task: `Subtask ${i + 1}`,
                          }}
                          index={i}
                        />
                      ))}

                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
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
