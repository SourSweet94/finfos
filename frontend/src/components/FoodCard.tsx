import { Card, Image } from "react-bootstrap";
import Button from "./Button";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FoodProps } from "../context/FoodContext";
import { Toast } from "react-bootstrap";

interface FoodCardProps {
  food: FoodProps;
  setShowToast: Dispatch<SetStateAction<boolean>>;
}

const FoodCard = ({ food, setShowToast }: FoodCardProps) => {

  const {_id, date, title, price, img} = food
  const {
    state: { user },
  } = useContext(AuthContext);


  const handleAddToCart = async () => {
    setShowToast(true)
    await fetch("http://localhost:4000/api/user/addtocart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ _id }),
    });
  };

  return (
    <Card className="shadow mb-5 mx-3 rounded" style={{ width: "14rem" }}>
      <Image className="mx-auto" src={img} width="100px" />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Title>{date.toString()}</Card.Title>
        <Card.Text style={{ color: "green" }}>RM {price}</Card.Text>
        <Button
          style={{ background: "#fccd4c", color: "black", border: "none" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
