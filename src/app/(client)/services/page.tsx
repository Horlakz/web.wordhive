import type { StaticImageData } from "next/image";
import type { NextPage } from "next";

import dummy from "@/assets/images/dummy.png";
import ServiceCard from "./Card";
import { ApplicationService } from "@/services/services";
import { ApplicationServiceCategory } from "@/services/services/category";
import SortByCategory from "@/components/common/SortByCategory";
import Pagination from "@/components/common/Pagination";

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

interface Props {
  searchParams: {
    page: number;
    category: string;
    limit: number;
  };
}

const ServicesPage: NextPage<Props> = async ({ searchParams }: Props) => {
  const servicesData = await applicationService.listServices(
    searchParams.category,
    "",
    searchParams.page
  );
  const categoriesData =
    await applicationServiceCategory.listServiceCategories();

  const [services, categories] = await Promise.all([
    servicesData,
    categoriesData,
  ]);

  return (
    <main className="py-5 sm:px-20 px-8">
      <SortByCategory
        categories={categories.data}
        active={searchParams.category}
      />

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {services.data.results.length == 0 ? (
          <p className="text-lg text-dark-600 text-center w-full">
            No Services Found
          </p>
        ) : (
          services.data.results.map((service: ServicesData) => (
            <ServiceCard
              id={service.uuid}
              key={service.uuid}
              image={dummy}
              title={service.title}
              body={service.body}
              volumes={service.volumes}
            />
          ))
        )}
      </section>

      <Pagination
        current={searchParams.page}
        total={services.data.pagination.totalPages}
      />
    </main>
  );
};

export default ServicesPage;
