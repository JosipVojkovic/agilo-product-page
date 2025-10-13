import Link from "next/link";
import { Close } from "./icons/Close";
import { Search } from "./icons/Search";

import { ChevronDown } from "./icons/ChevronDown";
import { ROUTES } from "@/lib/constants/routes";

export default function MobileMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="fixed bg-foreground text-background top-0 left-0 h-full w-full max-w-[300px]">
      <div className="flex justify-between items-center h-[72px] px-8 border-b border-background">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 cursor-pointer" />
          <p>Search</p>
        </div>
        <Close
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>

      <div className="flex flex-col h-[calc(100%-72px)] justify-between">
        <ul className="flex-1 flex flex-col gap-8 text-3xl font-medium px-8 pt-8">
          <li>
            <Link href={ROUTES.ABOUT} onClick={() => setIsMenuOpen(false)}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES.INSPIRATION}
              onClick={() => setIsMenuOpen(false)}
            >
              INSPIRATION
            </Link>
          </li>
          <li>
            <Link href={ROUTES.SHOP} onClick={() => setIsMenuOpen(false)}>
              SHOP
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 px-8 pb-8">
          <p>HR</p>
          <ChevronDown className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
