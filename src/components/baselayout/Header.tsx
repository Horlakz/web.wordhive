import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import navLinks from "@/store/data/nav-links.json";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center capitalize px-16 py-4 shadow-lg">
      <Image src="/images/logo.png" width={40} height={40} alt="logo" />

      <nav>
        <ul className="flex-center gap-12">
          {navLinks.map((link, i) => {
            const isActive = pathname.startsWith(link.path);

            return (
              <li key={i}>
                <Link
                  className={isActive ? "text-primary" : "text-black"}
                  href={link.path}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link className="text-secondary" href={"/login"}>
        Sign In
      </Link>
    </header>
  );
};

export default Header;
