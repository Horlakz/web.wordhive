import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";

import Button from "@/components/common/Button";
import { AuthContext } from "@/store/context/auth";
import navLinks from "@/store/data/nav-links.json";
import Storage from "@/utilities/storage";
import classNames from "classnames";
import AuthModal from "../auth";

const AuthActionBtn = ({ isAuth }: { isAuth: boolean }) => {
  const router = useRouter();
  const { setModal } = useContext(AuthContext);

  return (
    <Button
      variant="outline"
      colorScheme="danger"
      className="border-none"
      onClick={() => {
        if (isAuth) {
          router.push("/account");
        } else {
          setModal(true);
        }
      }}
    >
      {isAuth ? "Account" : "Login"}
    </Button>
  );
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const storage = new Storage();
  const isAuth = storage.checkCookie("access");
  const { setModal } = useContext(AuthContext);
  const [nav, showNav] = useState(false);

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

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

      <div className="items-center hidden sm:flex">
        {isAuth && (
          <Link href="/account" className="text-secondary">
            Account
          </Link>
        )}

        <Button
          variant="outline"
          colorScheme="danger"
          className="border-none"
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

      <div className="relative sm:hidden">
        <button onClick={() => showNav(!nav)}>
          <span
            className={classNames(
              "menu-icon cursor-pointer",
              nav ? "active" : ""
            )}
          />
        </button>

        <AnimatePresence>
          {nav && (
            <motion.ul
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="z-10 absolute top-14 right-0 flex flex-col items-end bg-white text-lg gap-4 px-4 w-40"
            >
              {[
                ...navLinks,
                { name: isAuth ? "Account" : "", path: "/account" },
              ].map((link, i) => {
                const isActive = pathname.startsWith(link.path);

                if (i === navLinks.length) {
                  return (
                    <motion.li key={i}>
                      <Button
                        variant="outline"
                        colorScheme="danger"
                        className="border-none m-0 p-0"
                        onClick={() => {
                          if (isAuth) {
                            storage.removeCookie("access");
                            router.push("/");
                          } else {
                            setModal(true);
                          }

                          showNav(false);
                        }}
                      >
                        {isAuth ? "Logout" : "Login"}
                      </Button>
                    </motion.li>
                  );
                }

                return (
                  <motion.li key={i} onClick={() => showNav(false)}>
                    <Link
                      className={isActive ? "text-primary" : "text-black"}
                      href={link.path}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <AuthModal />
    </header>
  );
};

export default Header;
