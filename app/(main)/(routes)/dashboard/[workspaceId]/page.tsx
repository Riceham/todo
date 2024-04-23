import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const WorkspaceIdPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        height={400}
        width={400}
        className="dark:hidden select-none pointer-events-none"
        draggable={false}
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        height={400}
        width={400}
        className="hidden dark:block select-none pointer-events-none"
        draggable={false}
      />

      <h2 className="text-2xl font-medium">
        Create your first{" "}
        <span className="text-primary font-bold">Todo list</span> to get
        started.
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create Todo
      </Button>
    </div>
  );
};

export default WorkspaceIdPage;
