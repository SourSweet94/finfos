import React, { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../context/AuthContext";
import { FoodContext } from "../context/FoodContext";
import { AppContext } from "../context/AppContext";
import { Container } from "react-bootstrap";
import { FoodProps } from "../components/FoodDetails";
import "../styles/cart.css";

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

      dispatch({ type: "SET_FOOD", payload: filteredFood });
      setAmount(
        filteredFood.reduce((total: number, item: any) => total + item.price, 0)
      );
      setLoading(false);
    };
    if (user) {
      fetchCart();
    }
  }, []);

  return (
    <Container className="cart-container">
      {food &&
        food.map((food) => (
          <CartItem
            key={food._id}
            food={food}
            onDelete={() => handleDelete(food)}
          />
        ))}
      <Container className="cart-amount ">Amount: {amount}</Container>
    </Container>
  );
};

export default Cart;
