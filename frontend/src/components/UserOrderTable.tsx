import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";
import Table from "./Table";
import { Col, Row } from "react-bootstrap";

const UserOrderTable = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);

  const [order, setOrder] = useState([]);

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

  const headers = ["email", "item", "amount"];

  // const customCol = {
  //   Action: (row: any) => (
  //     <>
  //       <Button onClick={() => {}}>View</Button>
  //     </>
  //   ),
  // };

  const tableData = order.map((order: any) => ({
    email: order.buyer_email,
    item: order.items.map((item: any) => (
      <Row>
        <Col>{item.food_title}</Col>
        <Col>RM {item.food_price}</Col>{" "}
      </Row>
    )),
    amount: order.amount,
  }));

  return <Table headers={headers} data={tableData} showBtn={false} />;
};

export default UserOrderTable;
