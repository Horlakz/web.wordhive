import { StaticImageData } from "next/image";

import dummy from "@/assets/images/dummy.png";
import ServiceCard from "@/components/services/Card";
import { ApplicationService } from "@/services/services";
import { ApplicationServiceCategory } from "@/services/services/category";

const applicationService = new ApplicationService();
const applicationServiceCategory = new ApplicationServiceCategory();

interface ServicesData {
  uuid: string;
  title: string;
  image: StaticImageData | string;
  body: string;
  category: { name: string };
  volumes: {
    name: string;
    qualities: {
      type: string;
      price: number;
    }[];
  }[];
}
[];

const ServicesPage = async () => {
  const servicesData = await applicationService.listServices();
  const categoriesData =
    await applicationServiceCategory.listServiceCategories();

  const [services, categories] = await Promise.all([
    servicesData,
    categoriesData,
  ]);

  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {categories.data.map((category: { name: string; uuid: string }) => (
          <span
            key={category.uuid}
            className="text-lg text-dark-600 hover:text-secondary capitalize default-transition cursor-pointer"
          >
            {category.name}
          </span>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {services.data.map((service: ServicesData) => (
          <ServiceCard
            id={service.uuid}
            key={service.uuid}
            image={dummy}
            title={service.title}
            body={service.body}
            volumes={service.volumes}
          />
        ))}
      </section>
    </main>
  );
};

export default ServicesPage;
