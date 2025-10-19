"use client";

import Link from "next/link";
import { Case } from "./icons/Case";
import { Menu } from "./icons/Menu";
import MobileMenu from "./MobileMenu";
import { ROUTES } from "@/lib/constants/routes";
import { useEffect, useState } from "react";
import { Search } from "./icons/Search";
import { ChevronDown } from "./icons/ChevronDown";
import { useCart } from "@/lib/context/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartQuantity } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[72px] border-b border-transparent 
        ${scrolled ? `bg-background border-b-[#F4F4F4]` : "bg-transparent"}
      `}
    >
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
        <div className="relative">
          <Case className="w-6 h-6 text-foreground cursor-pointer" />
          <p className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-custom-2xs">
            {cartQuantity > 0 && cartQuantity}
          </p>
        </div>
        <Menu
          className="w-6 h-6 text-foreground cursor-pointer sm:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}
