import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";
import Table from "./Table";
import { Col, Row } from "react-bootstrap";

interface ItemsType {
  _id: string // mongodb autogenerated, unused
  food_id: string
  food_title: string
  food_price: number
}

interface OrderType {
  _id: string
  buyer_id: string
  buyer_email: string
  items: ItemsType[]
  amount: number
}

const UserOrderTable = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);

  const [order, setOrder] = useState<OrderType[]>([]);

  // const handleDelete = async ({ _id, price }: ) => {
  //   if (!user) {
  //     return;
  //   }
  //   await fetch(`http://localhost:4000/api/order`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({ _id }),
  //   });
  //   setOrder((prev) => prev.filter((order:any) => order._id !== _id));
  // };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/order", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      setOrder(json);
      console.log(json);

      setLoading(false);
    };
    if (user) {
      fetchOrder();
    }
  }, []);

  const headers = ["Email", "Item", "Amount"];

  // const customCol = {
  //   Action: (row: any) => (
  //     <>
  //       <Button onClick={() => {}}>View</Button>
  //     </>
  //   ),
  // };

  const tableData = order.map((order: OrderType) => ({
    email: order.buyer_email,
    item: order.items.map((item: ItemsType) => (
      <Row key={item._id}>
        <Col>{item.food_title}</Col>
        <Col>RM {item.food_price}</Col>{" "}
      </Row>
    )),
    amount: order.amount,
  }));

  return <Table headers={headers} data={tableData}/>;
};

export default UserOrderTable;
