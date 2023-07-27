"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "react-hot-toast";

import EnvelopeIcon from "@/assets/icons/envelope.svg";
import SendIcon from "@/assets/icons/send.svg";
import Accordion from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { useForm } from "@/hooks/useForm";
import { ContactService } from "@/services/contact";
import { FaqService } from "@/services/faq";
import { Key } from "react";

const ContactPage = () => {
  const contactService = new ContactService();
  const faqService = new FaqService();

  const formData = {
    fullname: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  };

  const { form, handleChange } = useForm(formData);

  const sendContactMessage = useMutation(
    async () => await contactService.createContact(form),
    {
      onSuccess: () => {
        toast.success("Message sent");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "An Error Occured while sending message"
        );
      },
    }
  );

  const { data, isSuccess, isError, isLoading } = useQuery(
    ["faqs"],
    async () => await faqService.listFaq(),
    {
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "An Error Occured while fetching FAQs"
        );
      },
    }
  );

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
            {[
              {
                title: "Chat with us",
                value: "reach out to us at hello@wordhive",
              },
              { title: "Call us", value: "Ring us on +234 814 3740 522" },
              {
                title: "Our office",
                value: "4A5E6 Souillet Ferry Los Laskerville, CP 9210",
              },
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-2">
                <Image src={EnvelopeIcon} alt="mail icon" />
                <div>
                  <span className="text-xl font-medium">{contact.title}</span>
                  <p className="text-[#e5e5e5]">{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-6 gap-x-6 gap-y-4 grid sm:grid-cols-2">
          <InputGroup.Input
            label="Full Name"
            value={form.fullname}
            name="fullname"
            onChange={handleChange}
          />

          <InputGroup.Input
            label="Email"
            type="email"
            onChange={handleChange}
          />
          <InputGroup.Input label="Phone" type="tel" onChange={handleChange} />
          <InputGroup.Input label="Country" onChange={handleChange} />
          <InputGroup.TextArea
            className="sm:col-span-2"
            label="Your Message"
            name="message"
            rows={5}
            onChange={handleChange}
          />
          <Button
            className="sm:col-span-2 justify-center"
            icon={<Image src={SendIcon} alt="icon" width={20} height={20} />}
            iconPosition="right"
            isLoading={sendContactMessage.isLoading}
            onClick={() => {
              sendContactMessage.mutate();
            }}
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
          {isSuccess &&
            data?.data.map(
              (item: { question: string; answer: string }, i: Key) => (
                <Accordion key={i} title={item.question} descr={item.answer} />
              )
            )}
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-600">Something went wrong</p>}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
