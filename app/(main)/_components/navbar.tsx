"use client";

import {
  CircleUserRound,
  LogOut,
  Menu,
  Settings,
  Settings2,
} from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WORKSPACES } from "@/constants";
import { useSettings } from "@/hooks/use-settings";

import { Search } from "./search";
import { Title } from "./title";
import { UserAvatar } from "./user-avatar";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const settings = useSettings();

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

        <div className="flex md:flex-[0.65] items-center gap-x-2 md:justify-between">
          <Search />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserAvatar src="/avatar.png" alt="Sanidhya" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sanidhya Kr.
                  </p>
                  <p className="text-xs leading-none dark:text-primary/80 text-muted-foreground">
                    sanidhya@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CircleUserRound className="h-4 w-4 mr-1 text-primary" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 className="h-4 w-4 mr-1 text-primary" />
                  Manage Subscription
                </DropdownMenuItem>
                <DropdownMenuItem onClick={settings.onOpen}>
                  <Settings className="h-4 w-4 mr-1 text-primary" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-1 text-primary" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
