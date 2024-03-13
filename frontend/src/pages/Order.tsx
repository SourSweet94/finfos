import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";

const Order = () => {
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

      setOrder(json);
      setLoading(false);
    };
    if (user) {
      fetchOrder();
    }
  }, []);

  return (
    <div>
      {order.length !== 0 ? (
        order.map((order: any) => (
          <div key={order._id}>
            <h2>Order #{order._id}</h2>
            <ul>
              {order.items.map((item: any) => (
                <li key={item._id}>
                  <div>{item.food_title}</div>
                  <div>Price: {item.food_price}</div>
                </li>
              ))}
            </ul>
            <p>Total Amount: {order.amount}</p>
            <hr />
          </div>
        ))
      ) : (
        <div>Order is empty</div>
      )}
    </div>
  );
};

export default Order;
