import type { PropsWithChildren } from "react";

import { SearchCommand } from "./_components/search-command";
import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex dark:bg-[#0D171E]">
      <Navigation />

      <main className="relative flex-1 h-full overflow-y-auto scrollbar">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
