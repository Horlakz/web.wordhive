import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  data: any;
  name?: string;
  pageUrl: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function SortByCategory({
  data,
  name = "Category",
  pageUrl,
  setCategory,
}: Props) {
  const router = useRouter();

  const plural = name == "Category" ? "Categories" : name + "s";

  return (
    <div className="flex items-center gap-4">
      <label htmlFor={name.toLocaleLowerCase()}>Sort by {name}: </label>
      <select
        name={name.toLocaleLowerCase()}
        id={name.toLocaleLowerCase()}
        className="bg-white drop-shadow-md p-3"
        onChange={(e) => {
          if (e.target.value === `manage-${plural.toLowerCase()}`) {
            router.push(`/admin/${pageUrl}/${plural.toLowerCase()}`);
          } else if (e.target.value == "all") {
            setCategory("");
          } else {
            setCategory(e.target.value);
          }
        }}
      >
        <option value="all">All</option>
        {data?.map((category: { uuid: string; name: string }) => (
          <option key={category.uuid} value={category.uuid}>
            {category.name}
          </option>
        ))}
        <option value={`manage-${plural.toLowerCase()}`} className="text-sm">
          Manage {plural}
        </option>
      </select>
    </div>
  );
}

export default SortByCategory;
