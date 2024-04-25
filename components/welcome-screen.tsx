"use client";

import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/use-create-workspace";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

type WelcomeScreenProps = {
  title: string | React.ReactElement;
  imgUrl: Record<"default" | "dark", { src: string; alt: string }>;
  type?: "dashboard" | "workspace";
};

export const WelcomeScreen = ({
  title,
  imgUrl,
  type = "dashboard",
}: WelcomeScreenProps) => {
  const createWorkspace = useCreateWorkspace();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={imgUrl.default.src}
        alt={imgUrl.default.alt}
        height={400}
        width={400}
        className="dark:hidden select-none pointer-events-none"
        draggable={false}
      />

      <Image
        src={imgUrl.dark.src}
        alt={imgUrl.dark.alt}
        height={400}
        width={400}
        className="hidden dark:block select-none pointer-events-none"
        draggable={false}
      />

      <h2 className="text-2xl font-medium">{title}</h2>

      {type === "dashboard" ? (
        <Button onClick={createWorkspace.onOpen}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Workspace
        </Button>
      ) : (
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Todo
        </Button>
      )}
    </div>
  );
};
