import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export const ActionButtons = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button>
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      <Button asChild>
        <Link href="#pricing-section">Try CountWave</Link>
      </Button>

      <ModeToggle />
    </div>
  );
};
