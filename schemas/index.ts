import * as z from "zod";

export const CreateWorkspace = z.object({
  name: z.string().min(1, {
    message: "Workspace name is required.",
  }),
});
