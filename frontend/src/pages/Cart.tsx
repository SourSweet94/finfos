import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../context/AuthContext";
import { FoodContext } from "../context/FoodContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";
import { FoodProps } from "../components/legacy/LegacyFoodDetails";
import "../styles/cart.css";
import Button from "../components/Button";

const Cart = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);

  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);

  const [amount, setAmount] = useState(0);

  const handleDelete = async ({ _id, price }: FoodProps) => {
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
    setAmount((prev) => prev - price);
  };

  const handleOrder = () => {};

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      dispatch({ type: "SET_FOOD", payload: null });
      const responseCart = await fetch("http://localhost:4000/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const cartData = await responseCart.json();

      const responseFood = await fetch("http://localhost:4000/api/food", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const foodData = await responseFood.json();
      const filteredFood = foodData.filter((food: any) =>
        cartData.some((cartItem: any) => cartItem.food_id === food._id)
      );

      dispatch({
        type: "SET_FOOD",
        payload: filteredFood,
      });
      setAmount(
        filteredFood.reduce((total: number, item: any) => total + item.price, 0)
      );
      setLoading(false);
    };
    if (user) {
      fetchCart();
    }
  }, []);
  console.log(food?.length);
  return (
    <>
      {food?.length !== 0 ? (
        <Container className="border pb-3">
          <Row className="cart-header py-3 mx-3">
            <Col>Image</Col>
            <Col>Title</Col>
            <Col>Price</Col>
            <Col>Action</Col>
          </Row>
          <Row className="cart-item mx-3">
            {food?.map((food) => (
              <CartItem
                key={food._id}
                food={food}
                onDelete={() => handleDelete(food)}
              />
            ))}
          </Row>
        </Container>
      ) : (
        <div>Cart is empty</div>
      )}
      <Container className="cart-amount ">
        <Row>
          <Col>Amount: {amount}</Col>
          <Col>
            <Button onClick={handleOrder}>Order Now</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
