import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const Order = () => {

  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     setLoading(true);
  //     // dispatch({ type: "SET_FOOD", payload: null });
  //     const responseCart = await fetch("http://localhost:4000/api/order/" + user, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     const cartData = await responseCart.json();

  //     const responseFood = await fetch("http://localhost:4000/api/food", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     const foodData = await responseFood.json();
  //     const filteredFood = foodData.filter((food: any) =>
  //       cartData.some((cartItem: any) => cartItem.food_id === food._id)
  //     );

  //     setLoading(false);
  //   };
  //   if (user) {
  //     fetchCart();
  //   }
  // }, []);
  return (
    <div>Order</div>
  )
}

export default Order