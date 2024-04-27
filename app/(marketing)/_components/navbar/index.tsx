import Image from "next/image";
import Logo from "./logo";
import ActionButtons from "./action-buttons";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-10 border-b fixed w-full pb-5 pt-5 bg-customBackground">
      <Logo />
      <div className="flex items-center justify-between">
        <ActionButtons />
      </div>
    </header>
  );
};
