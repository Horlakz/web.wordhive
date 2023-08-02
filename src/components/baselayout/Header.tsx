import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

import menu from "@/assets/icons/menu.svg";
import Button from "@/components/common/Button";
import { AuthContext } from "@/store/context/auth";
import navLinks from "@/store/data/nav-links.json";
import AuthModal from "../auth";
import Storage from "@/utilities/storage";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const storage = new Storage();
  const isAuth = storage.checkCookie("access");
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

      <div className="flex items-center">
        {isAuth && (
          <Link href="/account" className="text-secondary">
            Account
          </Link>
        )}

        <Button
          variant="outline"
          colorScheme="danger"
          className="border-none hidden sm:block"
          onClick={() => {
            if (isAuth) {
              storage.removeCookie("access");
              router.push("/");
            } else {
              setModal(true);
            }
          }}
        >
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>

      <Image src={menu} alt="menu" className="sm:hidden" />

      <AuthModal />
    </header>
  );
};

export default Header;
