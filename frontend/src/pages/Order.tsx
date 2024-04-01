import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";
import Text from "../components/Text";
import Pagination from "../components/Pagination";

type Item = {
  _id: string;
  food_id: string;
  food_price: number;
  food_title: string;
  food_date: Date;
};

type Order = {
  _id: string;
  amount: number;
  buyer_id: string;
  buyer_email: string;
  createdAt: Date;
  items: Item[];
};

const Order = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);
  const [order, setOrder] = useState<Order[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <>
      <Container className="border py-3 mb-3">
        {currentItems.length !== 0 ? (
          currentItems.map((order: Order) => (
            <Container key={order._id}>
              <div
                style={{
                  background: "#ededed",
                  borderRadius: "10px",
                  padding: "0px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text>Order #{order._id}</Text>
                <Text>
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </Text>
              </div>

              <ol>
                {order.items.map((item: Item) => (
                  <li key={item._id}>
                    <Container>
                      <Row>
                        <Col>
                          {new Date(item.food_date).toLocaleDateString("en-GB")}
                        </Col>
                        <Col>{item.food_title}</Col>
                        <Col
                          style={{ display: "flex", justifyContent: "right" }}
                        >
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={order.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default Order;
