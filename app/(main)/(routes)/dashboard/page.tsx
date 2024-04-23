import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const DashboardPage = () => {
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
        Welcome to <span className="text-primary font-bold">CountWave</span>.
      </h2>

      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Workspace
      </Button>
    </div>
  );
};

export default DashboardPage;
