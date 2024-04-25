"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutGrid } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Workspace name is required.",
  }),
});

export const CreateWorkspaceModal = () => {
  const { isOpen, onClose } = useWorkspace();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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

  return (
    <Dialog open={isOpen || isLoading} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold flex justify-center items-center text-primary">
            <LayoutGrid className="h-6 w-6 mr-2" />
            Add Workspace
          </DialogTitle>

          <DialogDescription className="text-center font-semibold text-zinc-500">
            Enhance collaboration and manage todo list more effectively with
            multiple workspaces.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            autoCapitalize="off"
            autoComplete="off"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Workspace name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder="Enter workspace name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading} aria-disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
