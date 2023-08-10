import Image from "next/image";

import dummyCircle from "@/assets/images/dummy-circle.png";
import heroImage from "@/assets/images/hero.svg";
import Button from "@/components/common/Button";
import InquirySection from "@/components/about/InquirySection";

export default function Home() {
  return (
    <main className="sm:p-20 p-6 space-y-16">
      <section className="flex-center gap-20">
        <div className="space-y-6 sm:p-0 pr-20">
          <h4 className="text-5xl sm:text-7xl font-medium capitalize sm:leading-[5.5rem] leading-snug">
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
          <Button href="/services">Get Started</Button>
        </div>

        <Image
          src={heroImage}
          width={500}
          height={500}
          alt="Hero"
          className="sm:block hidden"
        />
      </section>

      <section className="flex-col-center gap-10">
        <div className="text-center">
          <h3 className="text-primary sm:text-3xl text-xl font-semibold">
            Why Wordhive
          </h3>
          <p className="sm:text-lg text-dark-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            iste.
          </p>
        </div>

        <div className="flex-center flex-col sm:flex-row gap-8">
          {[...new Array(3)].map((i) => (
            <div key={i} className="space-y-4">
              <Image
                src={dummyCircle}
                width={48}
                height={48}
                alt="icon"
                className="mb-4 rounded-full"
              />
              <span className="text-dark-900 font-semibold text-xl">
                The most inspiring future
              </span>
              <p className="text-dark-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                qui eveniet perferendis. Nemo ipsum, quod et voluptas porro
                voluptates beatae.
              </p>
            </div>
          ))}
        </div>
      </section>

      <InquirySection />

      <section className="flex-col-center gap-10">
        <div className="text-center">
          <h3 className="text-primary sm:text-3xl text-xl font-semibold">
            Client Reviews
          </h3>
          <p className="sm:text-lg text-dark-600">
            Here are the things a couple of our clients say about us
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          {[...new Array(6)].map((i) => (
            <div key={i} className="w-96 p-6 space-y-4">
              <p className="text-black">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur animi architecto, vitae reiciendis eos labore quaerat
                rem deserunt sequi eligendi culpa asperiores natus alias in.
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={dummyCircle}
                  width={40}
                  height={40}
                  alt="user"
                  className="rounded-lg"
                />
                <div className="grid gap-1">
                  <span className="text-gray-900 font-medium">
                    Firstname Lastname
                  </span>
                  <span className="text-sm text-gray-600">
                    Founder, Bitcoin&nbsp;&#40;BTC&#41;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
