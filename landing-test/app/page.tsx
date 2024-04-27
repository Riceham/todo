"use client";

import { useRouter } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="dark:bg-[#0D171E] h-full w-full flex flex-col gap-y-5 items-center justify-center">
      <h1 className="text-4xl">Hello, World!</h1>

      <Button
        onClick={() => router.push("/dashboard")}
        variant="default"
        size="lg"
      >
        Dashboard
      </Button>

      <ModeToggle />
    </main>
  );
};

export default HomePage;
