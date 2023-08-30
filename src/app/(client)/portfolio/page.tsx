import Image from "next/image";
import { Key } from "react";

import success from "@/assets/icons/success.svg";
import { PortfolioData, PortfolioService } from "@/services/portfolio";
import { PortfolioFieldData } from "@/services/portfolio/field";
import { PortfolioGenreData } from "@/services/portfolio/genre";

const portfolioService = new PortfolioService();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Portfolio = async () => {
  const { data } = await portfolioService.listPortfolios("", "");

  return (
    <main className="grid sm:grid-cols-3 sm:p-10 p-6 gap-10">
      {data.results.map((portfolio: PortfolioData, i: Key) => (
        <div key={i} className="border-2 rounded-2xl p-4 w-80 h-fit">
          <Image
            src={apiUrl + "/media/" + portfolio.image}
            width={250}
            height={250}
            alt={portfolio.title}
            className="rounded-3xl w-72 h-64"
          />

          <h6 className="text-2xl text-dark-900 mt-2 font-semibold">
            {portfolio.title}
          </h6>

          <span className="text-[#A3A3A3] text-sm">
            {(portfolio.field as PortfolioFieldData)["name"]}
          </span>

          <p className="text-dark-600 line-clamp-4">{portfolio.body}</p>

          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap mt-6">
            {(portfolio.genres as PortfolioGenreData[]).map((genre, i) => (
              <div
                key={i}
                className="flex-center bg-secondary bg-opacity-10 w-fit gap-1 p-1 rounded-full"
              >
                <Image src={success} alt="success icon" width={20} />
                <span className="text-xs text-secondary">{genre.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Portfolio;
