import * as z from "zod";

/* ============== WORKSPACE ============== */

export const CreateWorkspace = z.object({
  name: z.string().min(1, {
    message: "Workspace name is required.",
  }),
});

export const DeleteWorkspace = z.object({
  id: z.string().min(1, {
    message: "Workspace id is required.",
  }),
});

export const UpdateWorkspace = z.object({
  id: z.string().min(1, {
    message: "Workspace id is required.",
  }),
  updateData: z.object({
    name: z
      .string()
      .min(1, {
        message: "Workspace name is required.",
      })
      .optional(),
    isPublic: z.boolean().optional(),
    publicId: z
      .string()
      .min(1, {
        message: "Workspace public id is required.",
      })
      .optional(),
  }),
});

/* ============== TODO ============== */

export const CreateTodo = z.object({
  workspaceId: z.string().min(1, {
    message: "Workspace id is required.",
  }),
  name: z.string().min(1, {
    message: "Task name is required.",
  }),
});

export const UpdateTodoOrder = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      task: z.string(),
      description: z.string().nullable(),
      order: z.number(),
      isCompleted: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  workspaceId: z.string(),
});

export const UpdateTodo = z.object({
  todo: z.object({
    id: z.string(),
    workspaceId: z.string(),
    task: z.string(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});
