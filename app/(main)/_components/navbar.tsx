"use client";

import { Menu } from "lucide-react";
import { useParams } from "next/navigation";

import { WORKSPACES } from "@/constants";

import { Search } from "./search";
import { Title } from "./title";
import { UserAvatar } from "./user-avatar";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  return (
    <nav className="bg-background px-4 py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <button onClick={onResetWidth}>
          <Menu role="button" className="h-6 w-6 text-muted-foreground" />
        </button>
      )}
      <div className="flex items-center justify-between w-full">
        <div>
          {params.workspaceId ? (
            <Title
              id={params.workspaceId as string}
              name={
                WORKSPACES.find(({ id }) => params.workspaceId === id)?.name ||
                "Untitled"
              }
            />
          ) : null}
        </div>
        <Search />

        <UserAvatar src="/avatar.png" alt="Sanidhya" />
      </div>
    </nav>
  );
};
