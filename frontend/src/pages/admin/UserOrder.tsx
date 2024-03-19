import { useState } from "react";
import Pagination from "../../components/Pagination";
import UserOrderTable from "../../components/UserOrderTable";

const UserOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to display per page

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  return (
    <>
      <UserOrderTable />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPageShown={3}
        totalPages={5}
      />
    </>
  );
};

export default UserOrder;
