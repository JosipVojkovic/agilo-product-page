import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <div>SofaSocietyCo.</div>

      <nav>
        <ul>
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

      <div></div>
    </header>
  );
}
