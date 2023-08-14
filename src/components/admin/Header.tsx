import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import logout from "@/assets/icons/logout.svg";
import { adminNavLinks } from "@/store/data/admin-nav-links";
import Storage from "@/utilities/storage";
import Button from "../common/Button";

function AdminHeader() {
  const pathname = usePathname();
  const { push } = useRouter();
  const storage = new Storage();

  function handleLogout() {
    storage.removeCookie("access");
    push("/");
  }

  return (
    <header className="bg-admin-primary flex justify-between items-center text-[#D4D4D4] text-lg capitalize sm:px-12 px-6 py-4 shadow-lg">
      <Link href="/admin" className="flex-center gap-2">
        <Image src="/images/logo.png" width={40} height={40} alt="logo" />
        <h1 className="text-3xl font-bold">Wordhive</h1>
      </Link>

      <nav className="hidden sm:block">
        <ul className="flex-center gap-8">
          {adminNavLinks.map((link, i) => {
            const path = "/admin" + link.path;
            const isActive = pathname.startsWith(path);

            return (
              <li
                key={i}
                className={classNames("flex gap-2", isActive && "text-white")}
              >
                <Image src={link.icon} alt={link.name} />
                <Link href={path}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Button
        variant="outline"
        className="border-none text-[#D4D4D4]"
        icon={<Image src={logout} alt="logout icon" />}
        iconPosition="right"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;
