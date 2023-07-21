import dummy from "@/assets/images/dummy.png";
import ServiceCard from "@/components/services/Card";

const ServicesPage = () => {
  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span className="text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer">
            Category
          </span>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCard
            image={dummy}
            title={`Service Title ${i}`}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          quas dolor voluptatibus odit architecto debitis obcaecati nobis
          ducimus accusamus unde?"
            price={20}
          />
        ))}
      </section>
    </main>
  );
};

export default ServicesPage;
