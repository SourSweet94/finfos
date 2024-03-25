import { useEffect } from "react";
import { Pagination as BSPagination } from "react-bootstrap";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (number: number) => void;
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <BSPagination>
      <BSPagination.Prev onClick={handlePrevClick} disabled={currentPage === 1} />
      {pageNumbers.map((number) => (
        <BSPagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </BSPagination.Item>
      ))}
      <BSPagination.Next
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      />
    </BSPagination>
  );
};

export default Pagination;
