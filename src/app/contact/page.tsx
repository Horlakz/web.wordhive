import Image from "next/image";

import SendIcon from "@/assets/icons/send.svg";
import Accordion from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";

const ContactPage = () => {
  return (
    <main className="sm:p-20 p-6 space-y-10">
      <section className="flex-center sm:flex-row flex-col w-full gap-8">
        <div className="sm:w-3/5 py-10 px-6 space-y-3 bg-primary text-white">
          <h3 className="text-3xl font-semibold">Contact Us</h3>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            dignissimos, fugiat maiores non facere error recusandae.
          </p>

          <div className="space-y-2">
            {[1, 2, 3].map((contact, i) => (
              <div key={i} className="flex items-center gap-2">
                <Image src="" alt="mail icon" />
                <div>
                  <span className="text-xl font-medium">Chat with us</span>
                  <p>React out to us at hello@wordhive.com</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-6 gap-x-6 gap-y-4 grid sm:grid-cols-2">
          <InputGroup.Input label="Full Name" />
          <InputGroup.Input label="Email" type="email" />
          <InputGroup.Input label="Phone" type="tel" />
          <InputGroup.Input label="Country" />
          <InputGroup.TextArea
            className="sm:col-span-2"
            label="Your Message"
            rows={5}
          />
          <Button
            className="sm:col-span-2 justify-center"
            icon={<Image src={SendIcon} alt="icon" width={20} height={20} />}
            iconPosition="right"
          >
            Send Message
          </Button>
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-2xl text-primary font-medium text-center">
          Frequently Asked Questions
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">
          {[...new Array(7)].map((content, i) => (
            <Accordion
              key={i}
              title="Hello World"
              descr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quae necessitatibus magni nobis unde ipsa totam quia reiciendis porro dolore mollitia distinctio qui in assumenda vero, architecto tempore natus molestiae!"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
