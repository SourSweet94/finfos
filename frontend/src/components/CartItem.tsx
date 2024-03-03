import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "./Button";

interface CartItemProps {
  title: string;
  price: number;
}

const CartItem = ({ title, price }: CartItemProps) => {
  const [qty, setQty] = useState<number>(1);

  const handleIncrease = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };
  
  return (
    <Card className="shadow mb-5 mx-3 rounded" style={{ width: "14rem" }}>
      {/* <Image className="mx-auto" src={image} width="100px" /> */}
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ color: "green" }}>RM {price}</Card.Text>
        <Button onClick={handleIncrease}>+</Button>
        {qty}
        <Button onClick={handleDecrease}>-</Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
