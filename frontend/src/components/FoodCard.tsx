import { Card, Container, Image } from "react-bootstrap";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FoodProps } from "../context/FoodContext";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import Text from "./Text";

interface FoodCardProps {
  food: FoodProps;
  setShowInfoModal: Dispatch<SetStateAction<boolean>>;
}

const FoodCard = ({ food, setShowInfoModal }: FoodCardProps) => {
  const { _id, date, title, price, image } = food;
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const handleAddToCart = async () => {
    setLoading(true);
    setShowInfoModal(true);
    await fetch("http://localhost:4000/api/user/addtocart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ _id }),
    });
    setLoading(false);
  };
  return (
    <Card className="shadow mb-5 mx-3 rounded" style={{ width: "14rem" }}>
      <Card.Body className="text-center">
        <Container style={{ top: 0, height: "100px", marginBottom: "10px" }}>
          {image ? (
            <Image
              className="mx-auto"
              src={`/uploads/${image}`}
              width="100%"
            />
          ) : (
            <Text>No image</Text>
          )}
        </Container>
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
