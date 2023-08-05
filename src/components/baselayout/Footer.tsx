import Image from "next/image";
import React from "react";
import Link from "next/link";

import navLinks from "@/store/data/nav-links.json";
import { socialLinks } from "@/store/data/social-links";

const Footer = () => {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.host);
    }
  }, []);

  return (
    <footer className="sm:px-40 pb-6 sm:space-y-20 space-y-6">
      <section className="flex justify-between items-center sm:flex-row flex-col">
        <h1 className="flex items-center gap-1">
          <Image
            src="/images/logo.png"
            width={20}
            height={20}
            alt="wordhive logo"
          />
          <span className="font-bold text-2xl">Wordhive</span>
        </h1>

        <nav>
          <ul className="flex-center sm:gap-20 gap-4">
            {navLinks.map((link, i) => {
              return (
                <li key={i}>
                  <Link className="uppercase" href={link.path}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      <section className="px-6 flex flex-wrap justify-between items-center text-sm text-[#525252]">
        <div className="flex items-center gap-2">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href}>
              <Image src={link.icon} alt={link.name + "icon"} />
            </a>
          ))}
        </div>

        <span>
          Copyright &copy;{new Date().getFullYear()} {url}
        </span>
      </section>
    </footer>
  );
};

export default Footer;
