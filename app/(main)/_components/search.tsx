"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Search = () => {
  return (
    <Button
      variant="outline"
      className="w-1/4 dark:hover:bg-foreground/10 cursor-text"
      asChild
    >
      <div className="flex justify-between">
        <span className="flex">
          <SearchIcon className="h-4 w-4 mr-2" /> Search workspaces...
        </span>

        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border dark:bg-foreground/10 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </Button>
  );
};
