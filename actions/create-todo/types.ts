import type { Todo } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { CreateTodo } from "@/schema";

export type InputType = z.infer<typeof CreateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
