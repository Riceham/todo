"use client";

import { CalendarDays, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { Task } from "@/app/(main)/_components/task";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WelcomeScreen } from "@/components/welcome-screen";
import { WORKSPACES } from "@/constants";

type WorkspaceIdPageProps = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  // TODO: check if workspace has todo list
  const hasTodoList = true;

  const todos = WORKSPACES.find(
    (workspace) => params.workspaceId === workspace.id
  )?.todos;

  if (!todos) redirect("/dashboard");

  const handleClick = () => {
    console.log(params.workspaceId);
  };

  if (hasTodoList) {
    return (
      <div className="flex mt-[55px] mx-2 flex-col flex-1 p-4">
        <div className="flex justify-between items-center mb-5">
          <h1 className="flex items-end text-4xl font-bold">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 mr-2 text-primary" />
              Today
            </div>
            <span className="text-sm ml-1.5 text-primary">
              ({todos.length})
            </span>
          </h1>
        </div>
        <Button className="self-start mb-5">
          <Plus className="h-4 w-4 mr-2" /> Add New Task
        </Button>
        <ScrollArea className="flex-1 mb-5">
          <ul className="space-y-3">
            {todos.map((todo) => (
              <Task key={todo.id} todo={todo} />
            ))}
          </ul>
        </ScrollArea>
      </div>
    );
  } else {
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
        onClick={handleClick}
        type="workspace"
      />
    );
  }
};

export default WorkspaceIdPage;
