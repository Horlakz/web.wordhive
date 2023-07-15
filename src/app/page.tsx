import Image from "next/image";

import heroImage from "@/assets/images/hero.svg";
import customerCare from "@/assets/images/customer-care.png";
import dummy from "@/assets/images/dummy.png";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="p-20 space-y-16">
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

      <section className="flex-col-center gap-10">
        <div className="text-center">
          <h3 className="text-primary text-3xl font-semibold">Why Wordhive</h3>
          <p className="text-lg text-dark-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            iste.
          </p>
        </div>

        <div className="flex-center gap-4">
          {[...new Array(3)].map((i) => (
            <div key={i} className="space-y-4">
              <Image src={dummy} width={48} height={48} alt="icon" />
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

      <section className="px-48 flex-center gap-10">
        <div>
          <h5 className="text-2xl font-semibold text-primary">
            Have any Inquiries?
          </h5>
          <p className="text-dark-600 mb-4 w-[35rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nihil
            ipsa quos similique alias. Deleniti optio, dolorum nostrum ab
            perspiciatis est fugiat, sed quaerat omnis eligendi quibusdam,
            repellat atque ex.
          </p>
          <Button>Contact us now!</Button>
        </div>

        <Image
          src={customerCare}
          width={400}
          height={400}
          alt="customer care"
        />
      </section>

      <section className="flex-col-center gap-10">
        <div className="text-center">
          <h3 className="text-primary text-3xl font-semibold">
            Client Reviews
          </h3>
          <p className="text-lg text-dark-600">
            Here are the things a couple of our clients say about us
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          {[...new Array(6)].map(() => (
            <div className="w-96 p-6 space-y-4">
              <p className="text-black">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur animi architecto, vitae reiciendis eos labore quaerat
                rem deserunt sequi eligendi culpa asperiores natus alias in.
              </p>
              <div className="flex items-center gap-3">
                <Image src={dummy} width={40} height={40} alt="user" />
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
