import { ArrowRight, CircleArrowUp, CircleGauge, LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const ActionButtons = () => {
  const isLoggedIn = false;

  return (
    <div className="flex items-center gap-x-2">
      {isLoggedIn ? (
        <>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <CircleGauge className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="#pricing">
              <CircleArrowUp className="h-4 w-4 mr-1" />
              Upgrade
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild>
            <Link href="/sign-up">
              Get started
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-in">
              <LogIn className="h-4 w-4 mr-1" />
              Sign in
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};
