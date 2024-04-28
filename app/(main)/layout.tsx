import type { PropsWithChildren } from "react";

import { SearchCommand } from "./_components/search-command";
import { Navigation } from "./_components/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) return redirectToSignIn();

  const workspaces = await db.workspace.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="h-full flex dark:bg-[#0D171E]">
      <Navigation workspaces={workspaces} />

      <main className="relative flex-1 h-full overflow-y-auto scrollbar">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
