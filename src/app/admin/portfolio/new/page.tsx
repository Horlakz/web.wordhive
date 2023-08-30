"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import MultiSelectInput, {
  OptionT,
} from "@/components/common/MultiSelectInput";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { PortfolioService } from "@/services/portfolio";
import {
  PortfolioFieldData,
  PortfolioFieldService,
} from "@/services/portfolio/field";
import { PortfolioGenreService } from "@/services/portfolio/genre";
import BackButton from "@/components/admin/BackButton";

const CreateNewPortfolioPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [genresObj, setGenresObj] = useState<OptionT[]>([]);
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const portfolioService = new PortfolioService();
  const portfolioFieldService = new PortfolioFieldService();
  const portfolioGenreService = new PortfolioGenreService();
  const genres = genresObj.map((genre) => genre.uuid);
  const data = { title, field, genres, body, image };

  const fields = useQuery(
    ["fields"],
    async () => await portfolioFieldService.listPorfolioField()
  );

  const listGenres = useQuery(
    ["genres"],
    async () => await portfolioGenreService.listPorfolioGenres()
  );

  const create = useMutation(
    async () => await portfolioService.createPortfolio(data),
    {
      onSuccess: () => {
        toast.success("Portfolio has been Posted Successfully");
        router.push("/admin/portfolio");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ?? "Error Occured while creating blog post"
        );
      },
    }
  );

  const isLoading = fields.isLoading || listGenres.isLoading;
  const isError = fields.isError || listGenres.isError;

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <BackButton />
      </div>

      <h2 className="text-xl font-semibold">Post New Portfolio</h2>
      <form className="space-y-6 my-4 w-[50rem]">
        <div className="w-full flex gap-6">
          <InputGroup.Input
            showLabel={false}
            className="w-full"
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputGroup.Select
            showLabel={false}
            label="Category"
            value={field}
            onChange={(e) => setField(e.target.value)}
            options={fields.data.data.map((field: PortfolioFieldData) => ({
              label: field.name,
              value: field.uuid,
            }))}
            className="w-3/6"
          />
        </div>

        <div>
          <MultiSelectInput
            options={listGenres.data.data}
            value={genresObj}
            onChange={(genres: OptionT[]) => setGenresObj(genres)}
          />
          {genresObj.length > 4 && (
            <p className="text-sm mx-2 my-0.5 text-danger">
              Genres cannot be more than 4
            </p>
          )}
        </div>

        <InputGroup.TextArea
          showLabel={false}
          label="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="w-full">
          <span className="block mb-2 font-medium text-dark-900">
            Add Cover Image
          </span>
          <label htmlFor="file_input">
            <div className="bg-admin-nav p-3 space-x-4 rounded-lg">
              <span className="bg-white text-dark-600 px-4 py-1 rounded-md cursor-pointer">
                Upload Image
              </span>
              <span className="text-white">
                {image ? image.name : "No file chosen"}
              </span>
            </div>
          </label>
          <input
            className="hidden"
            id="file_input"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>

        <Button
          className="bg-admin-primary"
          isLoading={create.isLoading}
          onClick={() => create.mutate()}
        >
          Post Porfolio
        </Button>
      </form>
    </div>
  );
};

export default CreateNewPortfolioPage;
