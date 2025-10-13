"use client";

import Link from "next/link";
import { Case } from "./icons/Case";
import { Menu } from "./icons/Menu";
import MobileMenu from "./MobileMenu";
import { ROUTES } from "@/lib/constants/routes";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-white">
      <div className="text-2xl font-medium">SofaSocietyCo.</div>

      <nav>
        <ul className="hidden sm:flex gap-8 justify-center text-base">
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
        <Case className="w-8 h-8 p-1 text-foreground cursor-pointer" />
        <Menu
          className="w-8 h-8 p-1 text-foreground cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}
