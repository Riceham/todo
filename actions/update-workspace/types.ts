import { z } from "zod";
import { Workspace } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateWorkspace } from "@/schema";

export type InputType = z.infer<typeof UpdateWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
