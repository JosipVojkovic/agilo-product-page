"use client";

import Link from "next/link";
import { Case } from "./icons/Case";
import { Menu } from "./icons/Menu";
import MobileMenu from "./MobileMenu";
import { ROUTES } from "@/lib/constants/routes";
import { useState } from "react";
import { Search } from "./icons/Search";
import { ChevronDown } from "./icons/ChevronDown";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-white">
      <div className="flex items-center text-2xl font-medium">
        SofaSocietyCo.
      </div>

      <nav>
        <ul className="hidden sm:flex gap-8 justify-center items-center text-base">
          <li>
            <Link href={ROUTES.ABOUT}>About</Link>
          </li>

          <li>
            <Link href={ROUTES.INSPIRATION}>Inspiration</Link>
          </li>

          <li>
            <Link href={ROUTES.SHOP}>Shop</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <p>HR</p>
          <ChevronDown className="w-6 h-6 cursor-pointer" />
        </div>

        <Search className="hidden sm:flex w-5 h-5 text-foreground cursor-pointer" />
        <Case className="w-6 h-6 text-foreground cursor-pointer" />
        <Menu
          className="w-6 h-6 text-foreground cursor-pointer sm:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}
