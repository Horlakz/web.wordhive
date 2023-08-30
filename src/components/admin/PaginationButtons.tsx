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
  const prevBtnDisabled = page === 1;
  const nextBtnDisabled = page >= pagination?.totalPages;

  return (
    <div className="flex justify-end items-center">
      <Button
        variant="outline"
        className="border-none disabled:bg-transparent"
        disabled={prevBtnDisabled}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeftIcon
          strokeColor={prevBtnDisabled ? "#d4d4d4" : "#171717"}
        />
      </Button>
      <span className="text-dark-600">
        {(page - 1) * 10 + 1} -{" "}
        {nextBtnDisabled
          ? pagination?.total
          : pagination?.total > 10 && (page - 1) * 10 + 10}{" "}
        of {pagination?.total}
      </span>
      <Button
        variant="outline"
        className="border-none disabled:bg-transparent"
        disabled={nextBtnDisabled}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRightIcon
          strokeColor={nextBtnDisabled ? "#d4d4d4" : "#171717"}
        />
      </Button>
    </div>
  );
}

export default PaginationButtons;
