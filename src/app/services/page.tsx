import ServiceCard from "@/components/services/Card";
import { services } from "./data";

const ServicesPage = () => {
  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer"
          >
            Category {i}
          </span>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            image={service.image}
            title={`${service.title} ${i}`}
            body={service.body}
            volumes={service.volumes}
          />
        ))}
      </section>
    </main>
  );
};

export default ServicesPage;
