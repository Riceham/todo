import { Button } from "@/components/ui/button";
import { WelcomeScreen } from "@/components/welcome-screen";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const WorkspaceIdPage = () => {
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
};

export default WorkspaceIdPage;
