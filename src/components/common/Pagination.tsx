"use client";

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface Props {
  current: number;
  total: number;
}

function Pagination({ current = 1, total }: Props) {
  const router = useRouter();

  if (Number(total) <= 1) return null;

  return (
    <div className="flex center gap-4">
      <Button
        variant="outline"
        colorScheme="secondary"
        disabled={current == 1}
        onClick={() => router.push("/blog?page=" + Number(Number(current) - 1))}
      >
        Previous
      </Button>
      <div className="space-x-2">
        <span className="font-medium text-lg">{current}</span>
        <span className="text-gray-700">of</span>
        <span className="font-medium text-lg">{total}</span>
      </div>
      <Button
        colorScheme="secondary"
        disabled={current >= total}
        onClick={() => router.push("/blog?page=" + Number(Number(current) + 1))}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
