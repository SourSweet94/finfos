import { useContext, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  // const { record_id, food_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`http://localhost:4000/api/food/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: json });
      }
    };
    if (user) {
      fetchFood();
    }
  }, [dispatch, user]);

  console.log(food);

  return <div>Menu</div>;
};

export default Menu;
