import { auth } from "@clerk/nextjs/server";
import { CalendarDays, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { TaskList } from "@/app/(main)/_components/task-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WelcomeScreen } from "@/components/welcome-screen";
import { db } from "@/lib/db";

type WorkspaceIdPageProps = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) return redirectToSignIn();

  const workspace = await db.workspace.findUnique({
    where: {
      id: params.workspaceId,
      userId,
    },
    include: {
      todos: true,
    },
  });

  if (!workspace) redirect("/dashboard");

  if (workspace.todos.length === 0) {
    return (
      <WelcomeScreen
        title={
          <>
            Create your first{" "}
            <span className="text-primary font-bold">Todo list</span> to get
            started.
          </>
        }
        imgUrl={{
          default: {
            src: "/empty.png",
            alt: "Empty",
          },
          dark: {
            src: "/empty-dark.png",
            alt: "Empty",
          },
        }}
        type="workspace"
      />
    );
  }

  return (
    <div className="flex mt-[55px] mx-2 flex-col flex-1 p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="flex items-end text-4xl font-bold">
          <div className="flex items-center">
            <CalendarDays className="h-8 w-8 mr-2 text-primary" />
            Today
          </div>

          <span className="text-sm ml-1.5 text-primary">
            ({workspace.todos.length})
          </span>
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add New Task
        </Button>
      </div>

      <ScrollArea className="flex-1 mb-5">
        <TaskList todos={workspace.todos} />
      </ScrollArea>
    </div>
  );
};

export default WorkspaceIdPage;
