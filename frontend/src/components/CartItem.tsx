import { useContext, useState } from "react";
import { Card, Col, Container, Image, InputGroup, Row } from "react-bootstrap";
import Button from "./Button";
import "../styles/cartItem.css";
import { FoodContext, FoodProps } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import Text from "./Text";

interface CartItemProps {
  food: FoodProps;
  onDelete: () => void;
}

const CartItem = ({
  food: { title, price, image, _id },
  onDelete,
}: CartItemProps) => {
  const stylesheet = {
    btn: {
      width: "30px",
      display: "flex",
      justifyContent: "center",
    },
  };

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);

  // const [qty, setQty] = useState<number>(1);
  // const [totalPrice, setTotalPrice] = useState<number>(price);

  // const handleIncrease = () => {
  //   setQty((prev) => prev + 1);
  //   setTotalPrice((prev) => prev + price);
  // };

  // const handleDecrease = () => {
  //   setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
  //   setTotalPrice((prevTotalPrice) =>
  //     qty > 1 ? prevTotalPrice - price : prevTotalPrice
  //   );
  // };

  return (
    <Container className="py-3 border-top">
      <Row>
        <Col className="cart-item-col">
          {image ? (
            <Image
              className="mx-auto"
              src={`../../public/uploads/${image}`}
              width="100px"
            />
          ) : (
            <Text>No image</Text>
          )}
        </Col>
        <Col className="cart-item-col">{title}</Col>
        <Col className="cart-item-col">RM {price}</Col>
        {/* <Col className="cart-item-col">
            <InputGroup className="input-grp  flex-nowrap">
              <Button onClick={handleDecrease} style={stylesheet.btn}>
                -
              </Button>
              <InputGroup.Text className="qty">{qty}</InputGroup.Text>
              <Button onClick={handleIncrease} style={stylesheet.btn}>
                +
              </Button>
            </InputGroup>
          </Col> */}
        {/* <Col className="cart-item-col">{totalPrice}</Col> */}
        <Col className="cart-item-col">
          <Button onClick={onDelete} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartItem;
