import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import menu from "@/assets/icons/menu.svg";
import Button from "@/components/common/Button";
import { AuthContext } from "@/store/context/auth";
import navLinks from "@/store/data/nav-links.json";
import AuthModal from "../auth";

const Header = () => {
  const pathname = usePathname();
  const { setModal } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center capitalize sm:px-16 px-8 py-4 shadow-lg">
      <Link href="/">
        <Image src="/images/logo.png" width={40} height={40} alt="logo" />
      </Link>

      <nav className="hidden sm:block">
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

      <Button
        variant="outline"
        colorScheme="secondary"
        className="border-none hidden sm:block"
        onClick={() => setModal(true)}
      >
        Sign In
      </Button>

      <Image src={menu} alt="menu" className="sm:hidden" />

      <AuthModal />
    </header>
  );
};

export default Header;
