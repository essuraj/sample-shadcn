 import { FunctionComponent } from "react";
import { ModeToggle } from "./mode-toggle";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <a href="#" className="flex items-center gap-2">
          {/* <PowerIcon className="h-6 w-6" /> */}
          {/* <span className="text-lg font-bold hidden sm:block">Acme Inc</span> */}
        </a>
      </div>
      <nav className="hidden items-center gap-4 md:flex">
       <span className="text-lg font-bold hidden sm:block">NMS</span>
      <ModeToggle/>
      </nav>
      <div className="flex gap-1"></div>
    </header>
  );
};

export default Navbar;
