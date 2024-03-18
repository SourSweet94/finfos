import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import Table from "./Table";
import { Container } from "react-bootstrap";

interface OrderTableProps {}

const OrderTable = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/order/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(json);
      setOrder(json);
      setLoading(false);
    };
    if (user) {
      fetchOrder();
    }
  }, []);

  return (
    <>
      {order.length !== 0 ? (
        order.map((order: any) => (
          <Container key={order._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Order </h2>
              <span
                style={{
                  background: "#ededed",
                  borderRadius: "10px",
                  padding: "0px 10px",
                }}
              >
                #{order._id}
              </span>
            </div>

            <ul>
              {order.items.map((item: any) => (
                <li key={item._id}>
                  <strong>{item.food_title}</strong>
                  <div>Price: {item.food_price}</div>
                  <div>
                    Date: {new Date(item.food_date).toLocaleDateString("en-GB")}
                  </div>
                </li>
              ))}
            </ul>
            <p>Total Amount: {order.amount}</p>
            <hr />
          </Container>
        ))
      ) : (
        <div>Order is empty</div>
      )}
      <Table data={order} headers={["amount", "_id", "items"]} />
    </>
  );
};

export default OrderTable;
