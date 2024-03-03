import { Card, Image } from "react-bootstrap";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export interface FoodCardProps {
  // date: string
  title: string;
  price: number;
  image?: string; //enter path, or create upload image function
  // day: string;
  _id: string;
}

const FoodCard = ({ title, price, image, _id }: FoodCardProps) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleAddToCart = async () => {
    await fetch("http://localhost:4000/api/user/addtocart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ _id }),
    });
    console.log(JSON.stringify({ _id }));
  };

  return (
    <Card className="shadow mb-5 mx-3 rounded" style={{ width: "14rem" }}>
      <Image className="mx-auto" src={image} width="100px" />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
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
