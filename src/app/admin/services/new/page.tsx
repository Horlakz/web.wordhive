"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import {
  ApplicationService,
  ServiceData,
  ServiceVolume,
} from "@/services/services";
import {
  ApplicationServiceCategory,
  ServiceCategoryData,
} from "@/services/services/category";
import { ApplicationServiceIcon } from "@/services/services/icon";

const CreateNewServicePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [body, setBody] = useState("");
  const [volumes, setVolumes] = useState<ServiceVolume[]>([
    { name: "", qualities: [{ type: "A", price: 0 }] },
  ]);
  const appService = new ApplicationService();
  const appServiceCategory = new ApplicationServiceCategory();
  const appServiceIcon = new ApplicationServiceIcon();
  const data: ServiceData = { title, category, body, icon, volumes };

  const categories = useQuery(
    ["categories"],
    async () => await appServiceCategory.listServiceCategories()
  );

  const icons = useQuery(
    ["icons"],
    async () => await appServiceIcon.listServiceIcons()
  );

  const create = useMutation(async () => await appService.createService(data), {
    onSuccess: () => {
      toast.success("Service Created Successfully");
      router.push("/admin/services");
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ?? "Error Occured while creating Service"
      );
    },
  });

  function handleCreate() {
    create.mutate();
  }

  if (categories.isLoading || icons.isLoading) return <div>Loading...</div>;
  if (categories.isError || icons.isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  const handleAddVolume = () => {
    setVolumes((prev) => [
      ...prev,
      { name: "", qualities: [{ type: "A", price: 0 }] },
    ]);
  };

  const handleAddQuality = (index: number) => {
    setVolumes((prev) => {
      const volumes = prev.map((v, i) => {
        if (i === index) {
          return {
            ...v,
            qualities: [...v.qualities, { price: 0, type: "A" }],
          };
        }
        return v;
      });

      return volumes;
    });
  };

  const handleVolumeNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setVolumes((prev) => {
      const volumes = prev.map((v, i) => {
        if (i === index) {
          return {
            ...v,
            name: e.target.value,
          };
        }
        return v;
      });

      return volumes;
    });
  };

  const handleQualityTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    volumeIndex: number,
    qualityIndex: number
  ) => {
    setVolumes((prev) => {
      const volumes = prev.map((v, i) => {
        if (i === volumeIndex) {
          const qualities = v.qualities.map((q, j) => {
            if (j === qualityIndex) {
              return {
                ...q,
                type: e.target.value,
              };
            }
            return q;
          });

          return {
            ...v,
            qualities,
          };
        }
        return v;
      });

      return volumes;
    });
  };

  const handleQualityPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    volumeIndex: number,
    qualityIndex: number
  ) => {
    setVolumes((prev) => {
      const volumes = prev.map((v, i) => {
        if (i === volumeIndex) {
          const qualities = v.qualities.map((q, j) => {
            if (j === qualityIndex) {
              return {
                ...q,
                price: parseFloat(e.target.value),
              };
            }
            return q;
          });

          return {
            ...v,
            qualities,
          };
        }
        return v;
      });

      return volumes;
    });
  };

  const removeVolume = (index: number) => {
    setVolumes((prev) => {
      const volumes = prev.filter((_, i) => i !== index);
      return volumes;
    });
  };

  const removeQuality = (volumeIndex: number, qualityIndex: number) => {
    setVolumes((prev) => {
      const volumes = prev.map((v, i) => {
        if (i === volumeIndex) {
          const qualities = v.qualities.filter((_, j) => j !== qualityIndex);
          return {
            ...v,
            qualities,
          };
        }
        return v;
      });

      return volumes;
    });
  };

  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <Link href="/admin/users" className="flex-center gap-1 text-dark-600">
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </Link>
      </div>

      <h2 className="text-xl font-semibold">Create New Service</h2>
      <form className="space-y-6 my-4 w-[50rem]">
        <div className="w-full flex gap-6">
          <InputGroup.Input
            showLabel={false}
            className="w-full"
            label="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputGroup.Select
            showLabel={false}
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.data.data.map(
              (category: ServiceCategoryData) => ({
                label: category.name,
                value: category.uuid,
              })
            )}
            className="w-3/6"
          />

          <InputGroup.Select
            showLabel={false}
            label="Icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            options={icons.data.data.map(
              (category: { name: string; url: string }) => ({
                label: category.name,
                value: category.url,
              })
            )}
            className="w-2/6"
          />
        </div>
        <InputGroup.TextArea
          showLabel={false}
          label="Service Description"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="w-full flex flex-col">
          <h5 className="font-medium">Service Options</h5>

          <div>
            {volumes.map((vol, i) => (
              <div key={i} className="space-y-3 px-4 py-6">
                <div className="flex items-center gap-2">
                  <label>Volume</label>
                  <input
                    type="text"
                    className="bg-gray-100 border focus:outline-none px-2 py-1 rounded-lg"
                    value={vol.name}
                    onChange={(e) => handleVolumeNameChange(e, i)}
                  />
                  <span className="text-admin-light font-medium">pages</span>

                  <button
                    type="button"
                    className="text-danger font-medium"
                    onClick={() => removeVolume(i)}
                  >
                    Remove volume
                  </button>
                </div>

                {vol.qualities.map((quality, j) => (
                  <div key={j} className="flex gap-4">
                    <div className="flex items-center gap-3">
                      <label>Quality</label>
                      <select
                        name="quality_type"
                        id="quality_type"
                        className="bg-gray-100 border focus:outline-none px-2 py-1 rounded-lg"
                        value={quality.type}
                        onChange={(e) => handleQualityTypeChange(e, i, j)}
                      >
                        {["A", "B", "C", "D", "E"].map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label>Price</label>
                      <input
                        type="text"
                        className="bg-gray-100 border focus:outline-none px-2 py-1 rounded-lg"
                        value={quality.price}
                        onChange={(e) => handleQualityPriceChange(e, i, j)}
                      />
                    </div>
                    {j === vol.qualities.length - 1 ? (
                      <button
                        type="button"
                        className="text-admin-nav font-medium"
                        onClick={() => handleAddQuality(i)}
                      >
                        add quality
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-danger font-medium"
                        onClick={() => removeQuality(i, j)}
                      >
                        remove quality
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full text-admin-primary font-medium justify-center"
            onClick={handleAddVolume}
          >
            Add new option
          </button>
        </div>

        <Button
          className="bg-admin-primary"
          isLoading={create.isLoading}
          onClick={handleCreate}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateNewServicePage;
