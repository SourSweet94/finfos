import React, { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../context/AuthContext";
import { FoodContext } from "../context/FoodContext";
import { AppContext } from "../context/AppContext";
import { Container } from "react-bootstrap";

const Cart = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { loading, setLoading } = useContext(AppContext);

  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
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

      dispatch({ type: "SET_FOOD", payload: filteredFood });
      setAmount(
        filteredFood.reduce((total: number, item: any) => total + item.price, 0)
      );
      setLoading(false);
    };
    if (user) {
      setLoading(true);
      console.log(loading);
      fetchCart();
    }
  }, []);

  console.log(loading);
  return (
    <Container className="cart-container">
      {!loading ? (
        <>
          {food && food.map((food) => <CartItem key={food._id} food={food} />)}
          Amount: {amount}
        </>
      ) : (
        <div>LOADING</div>
      )}
    </Container>
  );
};

export default Cart;