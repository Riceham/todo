import type { PropsWithChildren } from "react";

import { Header } from "./_components/header";
// import { SearchCommand } from "./_components/search-command";
import { Sidebar } from "./_components/sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        {/* <SearchCommand /> */}
        <Header />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
