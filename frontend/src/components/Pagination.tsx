import React, { Dispatch, SetStateAction, useContext, useMemo } from "react"
import { Pagination as BSPagination, Container } from "react-bootstrap"
interface PaginationProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
  maxPageShown: number
  className?: string
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  maxPageShown,
  className,
}: PaginationProps) => {

  const calculateStartPage = () => {
    const minStartPage = 1
    const maxStartPage = Math.max(1, totalPages - maxPageShown + 1)
    const middleStartPage = Math.max(1, currentPage - Math.floor(maxPageShown / 2))

    return Math.min(maxStartPage, Math.max(minStartPage, middleStartPage))
  }

  const startPage = calculateStartPage()
  const endPage = Math.min(totalPages, Math.min(startPage, currentPage) + maxPageShown - 1)
  const renderPaginationItem = useMemo(() => {
    return Array.from({ length: Math.min(maxPageShown, totalPages) }, (_, index) => {
      const page = startPage + index
      return (
        <BSPagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </BSPagination.Item>
      )
    })
  }, [currentPage, totalPages])

  return (
    <Container className={`d-flex align-items-center p-0 ${className}`}>
      <BSPagination className="m-0">
        <BSPagination.Prev
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        />

        {/* Previous <...> */}
        {startPage > 1 && totalPages / maxPageShown > 1 && <BSPagination.Ellipsis />}

        {/* Pagination item */}
        {renderPaginationItem}

        {/* Next <...> */}
        {endPage < totalPages && <BSPagination.Ellipsis />}

        <BSPagination.Next
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        />
      </BSPagination>
    </Container>
  )
}
export default Pagination
