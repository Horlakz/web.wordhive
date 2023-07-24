import Image from "next/image";

import Button from "@/components/common/Button";

function AccountPage() {
  return (
    <div className="bg-dashboard bg-cover bg-no-repeat sm:px-36 px-6 sm:py-40 py-6">
      <main className="bg-white sm:px-20 sm:py-10 py-4 space-y-8 shadow-md">
        <h3 className="text-secondary sm:text-5xl text-4xl text-center sm:font-extrabold font-bold">
          Account Dashboard
        </h3>

        <div className="relative bg-primary h-32 rounded-t-3xl">
          <Image
            src="https://ui-avatars.com/api/john+doe?background=random"
            width={100}
            height={100}
            alt="profile icon"
            className="absolute -bottom-8 sm:left-10 left-6 rounded-full border-2 border-[#f5f5f5]"
          />
        </div>

        <section className="flex justify-between items-end pt-2 px-4">
          <div className="grid">
            <span className="text-2xl font-semibold text-dark-900">
              John Doe
            </span>
            <span className="sm:text-xl text-dark-600">johndoe@mail.com</span>
            <span className="sm:text-xl text-dark-600">+234 814 3740 522</span>
          </div>
          <Button
            variant="outline"
            className="border-none text-lg hidden sm:block"
          >
            Edit profile
          </Button>
        </section>

        <section className="px-4">
          <h6 className="text-xl font-semibold">List of orders</h6>
        </section>
      </main>
    </div>
  );
}

export default AccountPage;
