import { z } from "zod";
import { Workspace } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateWorkspace } from "@/schemas";

export type InputType = z.infer<typeof CreateWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
