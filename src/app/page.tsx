import Image from "next/image";

import heroImage from "@/assets/images/hero.svg";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="py-16 px-14">
      <section className="flex-center gap-20">
        <div className="space-y-6">
          <h4 className="text-7xl font-medium capitalize leading-[5.5rem]">
            <span className="text-primary">Your Bridge to perfect&nbsp;</span>
            <br />
            <span className="text-secondary">expression</span>
          </h4>

          <p className="text-dark-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            ab quas fugit! Est error laudantium labore repellendus architecto
            quo soluta dolorum similique veniam, placeat animi pariatur
            distinctio facilis fugiat modi!
          </p>
          <Button>Get Started</Button>
        </div>

        <Image src={heroImage} width={500} height={500} alt="Hero" />
      </section>
    </main>
  );
}
