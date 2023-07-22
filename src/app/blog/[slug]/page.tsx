import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import arrowLeft from "@/assets/icons/arrow-left.svg";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import dot from "@/assets/icons/dot.svg";
import BlogCard from "@/components/blog/Card";
import InputGroup from "@/components/common/InputGroup";
import Button from "@/components/common/Button";

interface Params {
  params: {
    slug: string;
  };
}

const ViewBlog: NextPage<Params> = ({ params }) => {
  const { slug } = params;

  const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  const currentDate = new Date().getTime();
  const randomDate = new Date(
    startOfYear + Math.random() * (currentDate - startOfYear)
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="px-10 py-6 w-full flex gap-8">
      <section className="space-y-2 w-full">
        <Link href="/blog">
          <div className="flex items-center gap-1 text-dark-900">
            <Image src={chevronLeft} alt="arrow left icon" />
            <span>Back to blog page</span>
          </div>
        </Link>

        <h2 className="sm:text-4xl text-2xl text-primary font-bold">
          Blog Title with slug: {slug}
        </h2>

        <div className="flex items-center font-semibold text-[#B1B1B1]">
          <span>Category</span>
          <Image src={dot} alt="dot" width={4} height={4} className="mx-2" />
          <span>{randomDate}</span>
        </div>

        <p className="text-dark-600 leading-loose">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          voluptatem id dolorem nesciunt consequuntur quasi alias adipisci
          dolorum deserunt placeat ea quibusdam velit distinctio qui
          perspiciatis amet officia optio, iusto impedit ipsum totam aliquid
          quaerat architecto earum. Fugiat consequuntur error aperiam quisquam
          ex, odio distinctio cum nihil ab, ratione illum! Molestias nihil animi
          aspernatur pariatur expedita provident distinctio exercitationem
          quaerat, laborum recusandae optio quo cumque ab quisquam, adipisci
          saepe hic delectus praesentium! Voluptatibus repellendus fugiat minus
          consequatur tempore ipsam illum nulla ex, ullam vitae quis ab,
          veritatis doloremque facilis impedit iste! Eaque, animi aut
          perspiciatis numquam ratione ipsa eligendi quod nobis culpa
          voluptatem. Sit excepturi possimus pariatur dolorum aliquid minus
          incidunt tempore nulla vel blanditiis deleniti molestiae doloremque
          esse odit vero numquam et obcaecati, nisi nostrum animi! Dignissimos
          officiis deserunt est. Et exercitationem quod reprehenderit quasi
          inventore velit porro repudiandae mollitia magnam molestias alias
          autem atque itaque dicta est eum natus dolorem molestiae saepe
          voluptas provident sunt, id hic! Corporis nostrum amet, hic eveniet,
          blanditiis, odit dolorem animi natus commodi ab non corrupti magni
          eius repellat beatae? Ad magnam quidem placeat. Nisi blanditiis
          dignissimos laborum corporis similique atque eaque, voluptatum magni
          eligendi quos commodi, quae amet? Eaque facilis consequatur ex?
        </p>

        <div className="space-y-4">
          <h3 className="text-xl text-primary font-semibold">Comments</h3>

          <div>
            {[...new Array(5)].map((_, i) => (
              <div key={i}>
                <span className="font-semibold text-lg">
                  Firstname Lastname
                </span>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Necessitatibus mollitia, omnis harum aliquam et quisquam?
                </p>
              </div>
            ))}
          </div>

          <form className="space-y-4">
            <InputGroup.Input label="Your Name" placeholder="Enter your name" />
            <InputGroup.TextArea label="Message" />
            <Button>Post Comment</Button>
          </form>
        </div>
      </section>

      <div className="border-l-4 border-primary relative mt-8 sm:block hidden">
        <span className="w-4 h-4 bg-primary absolute -top-7" />
      </div>

      <section className="sm:grid hidden gap-4 border-t-4 border-primary w-2/5 py-5">
        <h2 className="font-semibold text-2xl text-primary">Latest Blogs</h2>

        {[...new Array(4)].map((blog, i) => {
          const startOfYear = new Date(
            new Date().getFullYear(),
            0,
            1
          ).getTime();
          const currentDate = new Date().getTime();
          const randomDate = new Date(
            startOfYear + Math.random() * (currentDate - startOfYear)
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          return (
            <BlogCard
              key={i}
              title={"Blog Title " + Number(i + 1)}
              slug={i.toLocaleString()}
              body=""
              category="Category"
              date={randomDate}
            />
          );
        })}
      </section>
    </main>
  );
};

export default ViewBlog;
