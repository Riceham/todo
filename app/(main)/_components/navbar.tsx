"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Workspace } from "@prisma/client";
import {
  CircleArrowUp,
  CircleUserRound,
  LogOut,
  Menu,
  Settings,
  Settings2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Hint } from "@/components/hint";
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
import { useProfile } from "@/hooks/use-profile";
import { useSettings } from "@/hooks/use-settings";

import { Search } from "./search";
import { Title } from "./title";
import { UserAvatar } from "./user-avatar";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
  workspaces: Workspace[];
  isSubscribed: boolean;
};

export const Navbar = ({
  isCollapsed,
  onResetWidth,
  workspaces,
  isSubscribed,
}: NavbarProps) => {
  const params = useParams();
  const router = useRouter();
  const settings = useSettings();
  const profile = useProfile();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleSubscribe = () => {
    if (isSubscribed) {
      console.log("TODO: Redirect to Manage Subscription");
    } else router.push("/#pricing");
  };

  return (
    <nav className="bg-background px-4 py-2 w-full flex items-center gap-x-4 shadow-lg border-b-2">
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
                workspaces.find(({ id }) => id === params.workspaceId)?.name
              }
            />
          ) : null}
        </div>

        <div className="flex md:flex-[0.65] items-center gap-x-2 md:justify-between">
          <Search />

          <DropdownMenu>
            <Hint description="View Profile" side="left" sideOffset={12}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <UserAvatar src={user.imageUrl} alt={user.firstName || ""} />
                </Button>
              </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent className="w-52" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                  <p className="text-xs leading-none dark:text-primary/80 text-muted-foreground">
                    {user.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={profile.onOpen}>
                  <CircleUserRound className="h-4 w-4 mr-1 text-primary" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSubscribe}>
                  {isSubscribed ? (
                    <>
                      <Settings2 className="h-4 w-4 mr-1 text-primary" />
                      Manage Subscription
                    </>
                  ) : (
                    <>
                      <CircleArrowUp className="h-4 w-4 mr-1 text-primary" />
                      Upgrade
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={settings.onOpen}>
                  <Settings className="h-4 w-4 mr-1 text-primary" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <SignOutButton redirectUrl="/sign-in">
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-1 text-primary" />
                  Log out
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
