import { useContext, useState } from "react";
import { Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import Button from "./Button";
import { FoodCardProps } from "./FoodCard";
import "../styles/cartItem.css";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";

interface CartItemProps {
  food: FoodCardProps;
}

const CartItem = ({ food: { title, price, image, _id } }: CartItemProps) => {
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

  const [qty, setQty] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price);

  const handleIncrease = () => {
    setQty((prev) => prev + 1);
    setTotalPrice((prev) => prev + price);
  };

  const handleDecrease = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
    setTotalPrice((prevTotalPrice) =>
      qty > 1 ? prevTotalPrice - price : prevTotalPrice
    );
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    await fetch(`http://localhost:4000/api/user/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ _id }),
    });

    dispatch({ type: "DELETE_FOOD", payload: _id });
  };

  return (
    <Card className="shadow mb-5 mx-3 container">
      {/* <Image className="mx-auto" src={image} width="100px" /> */}
      <Card.Body className="text-center card-body">
        {/* <Container> */}
        <Row>
          <Col className="cart-item-col prim-info">
            {image}

            <Card.Title>{title}</Card.Title>
            <Card.Text style={{ color: "green" }}>RM {price}</Card.Text>
          </Col>
          <Col className="cart-item-col">
            <InputGroup className="input-grp  flex-nowrap">
              <Button onClick={handleDecrease} style={stylesheet.btn}>
                -
              </Button>
              <InputGroup.Text className="qty">{qty}</InputGroup.Text>
              <Button onClick={handleIncrease} style={stylesheet.btn}>
                +
              </Button>
            </InputGroup>
          </Col>
          <Col className="cart-item-col">{totalPrice}</Col>
          <Col className="cart-item-col">
            <Button onClick={handleDelete}>Delete</Button>
          </Col>
        </Row>
        {/* </Container> */}
      </Card.Body>
    </Card>
  );
};

export default CartItem;
