"use client";

import { LayoutGrid } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { WORKSPACES } from "@/constants";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

export const SearchCommand = () => {
  const params = useParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/dashboard/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search your workspaces..." />
      <CommandList className="scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Workspaces">
          {WORKSPACES?.map((workspace) => (
            <CommandItem
              key={workspace.id}
              id={workspace.id}
              value={workspace.name}
              title={workspace.name}
              onSelect={() => onSelect(workspace.id)}
              className={cn(
                "dark:aria-selected:bg-foreground/10",
                params.workspaceId === workspace.id &&
                  "dark:bg-foreground/10 bg-muted"
              )}
            >
              <LayoutGrid className="mr-2 h-4 w-4 text-primary/80" />

              <span
                className={cn(
                  params.workspaceId === workspace.id && "text-primary"
                )}
              >
                {workspace.name}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
