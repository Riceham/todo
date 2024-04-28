"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { CreateWorkspace } from "@/schemas";

import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { name } = data;

  if (!name) {
    return {
      error: "Missing fields. Failed to create workspace.",
    };
  }

  let workspace;

  try {
    workspace = await db.workspace.create({
      data: {
        userId,
        name,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create workspace.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/${workspace.id}`);
  return { data: workspace };
};

export const createWorkspace = createSafeAction(CreateWorkspace, handler);
