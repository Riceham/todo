import { z } from "zod";
import { Workspace } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteWorkspace } from "@/schemas";

export type InputType = z.infer<typeof DeleteWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
