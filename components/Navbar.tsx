import { NextComponentType } from "next";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex flex-row justify-center nav-gradient shadow shadow-primary-800 w-screen">
      <Link href="/">
        <a>
          <h1 className="text-black text-2xl font-medium">Cocinaditto</h1>
        </a>
      </Link>
    </nav>
  );
};
