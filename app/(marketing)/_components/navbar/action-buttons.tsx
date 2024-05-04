"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  ArrowRight,
  CircleArrowUp,
  CircleGauge,
  LogIn,
  Settings2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ActionButtonsProps = {
  isSubscribed: boolean;
};

export const ActionButtons = ({ isSubscribed }: ActionButtonsProps) => {
  const router = useRouter();

  const handleSubscribe = () => {
    if (isSubscribed) {
      console.log("TODO: Redirect to Manage Subscription");
    } else {
      router.push("/#pricing");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <SignedIn>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <CircleGauge className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
        </Button>
        <Button onClick={handleSubscribe}>
          {isSubscribed ? (
            <>
              <Settings2 className="h-4 w-4 mr-1" />
              Manage
            </>
          ) : (
            <>
              <CircleArrowUp className="h-4 w-4 mr-1" />
              Upgrade
            </>
          )}
        </Button>
      </SignedIn>
      <SignedOut>
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
      </SignedOut>
    </div>
  );
};
