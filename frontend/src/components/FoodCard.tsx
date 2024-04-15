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
  isOrdered: boolean;
  opened?: boolean;
}

const FoodCard = ({
  food,
  setShowInfoModal,
  isOrdered,
  opened,
}: FoodCardProps) => {
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
            <div style={{ height: "100px" }}>
              <Image
                className="mx-auto"
                src={`/uploads/${image}`}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <Text>No image</Text>
          )}
        </Container>
        <Card.Title>{title}</Card.Title>
        <div>
          <Card.Title>{new Date(date).toLocaleDateString("en-GB")}</Card.Title>
          <Card.Text style={{ color: "green" }}>RM {price}</Card.Text>
          <Button
            style={{ background: "#fccd4c", color: "black", border: "none" }}
            onClick={handleAddToCart}
            disabled={!opened || isOrdered}
          >
            {!opened ? "Expired" : isOrdered ? "Ordered" : "Add to Cart"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
