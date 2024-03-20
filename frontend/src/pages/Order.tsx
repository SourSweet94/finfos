import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container className="border py-3 mb-3">
      {order.length !== 0 ? (
        order.map((order: any) => (
          <Container key={order._id}>
            <div
              style={{
                background: "#ededed",
                borderRadius: "10px",
                padding: "0px 10px",
              }}
            >
              Order #{order._id}
            </div>

            <ol>
              {order.items.map((item: any) => (
                <li key={item._id}>
                  <Container>
                    <Row>
                      <Col>
                        {new Date(item.food_date).toLocaleDateString("en-GB")}
                      </Col>
                      <Col>{item.food_title}</Col>
                      <Col style={{ display: "flex", justifyContent: "right" }}>
                        RM {item.food_price}
                      </Col>
                    </Row>
                  </Container>
                </li>
              ))}
            </ol>
            <div style={{ display: "flex", justifyContent: "right" }}>
              Total Amount: RM {order.amount}
            </div>
            <hr />
          </Container>
        ))
      ) : (
        <div>Order is empty</div>
      )}
    </Container>
  );
};

export default Order;
