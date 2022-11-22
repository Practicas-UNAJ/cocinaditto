import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <nav className="relative grid justify-center text-black nav-gradient shadow shadow-primary-800 w-screen">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-medium">Cocinaditto</h1>
        </a>
      </Link>
      <button
        className="h-full fit absolute right-5"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon icon="charm:menu-hamburger" className="w-full h-full" />
      </button>
      <Menu state={showMenu} setState={() => {setShowMenu(!showMenu)}}/>
    </nav>
  );
};
