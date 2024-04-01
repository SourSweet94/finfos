import { Col, Container, Image, Row } from "react-bootstrap";
import { FoodProps } from "../context/FoodContext";
import Button from "./Button";
import Text from "./Text";
import "../styles/cartItem.css";

interface CartItemProps {
  food: FoodProps;
  onDelete: () => void;
}

const CartItem = ({
  food: { title, price, image },
  onDelete,
}: CartItemProps) => {

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
