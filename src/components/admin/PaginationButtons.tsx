import Button from "../common/Button";
import ChevronLeftIcon from "../icons/ChevronLeft";
import ChevronRightIcon from "../icons/ChevronRight";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: {
    total: number;
    totalPages: number;
  };
}

function PaginationButtons({ page, setPage, pagination }: Props) {
  return (
    <div className="flex justify-end items-center">
      <Button
        variant="outline"
        className="border-none disabled:bg-transparent"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeftIcon strokeColor={page === 1 ? "#d4d4d4" : "#171717"} />
      </Button>
      <span className="text-dark-600">
        {page === 1 ? 1 : (page - 1) * 10} -{" "}
        {pagination?.total > 10 ? 10 : pagination?.total} of {pagination?.total}
      </span>
      <Button
        variant="outline"
        className="border-none disabled:bg-transparent"
        disabled={page == pagination?.totalPages}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRightIcon
          strokeColor={page == pagination?.totalPages ? "#d4d4d4" : "#171717"}
        />
      </Button>
    </div>
  );
}

export default PaginationButtons;
