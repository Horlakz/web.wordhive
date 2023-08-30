import { useRouter } from "next/navigation";
import ChevronLeftIcon from "../icons/ChevronLeft";

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex-center gap-1 text-dark-600"
    >
      <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
      <span>Go Back</span>
    </button>
  );
}

export default BackButton;
