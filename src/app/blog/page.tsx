import BlogCard from "@/components/blog/Card";

const Blog = () => {
  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer"
          >
            Category
          </span>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {[...new Array(10)].map((blog, i) => {
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

export default Blog;
