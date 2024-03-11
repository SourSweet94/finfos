import { useContext, useEffect } from "react";
import { FoodContext } from "../../context/FoodContext";
import { AuthContext } from "../../context/AuthContext";
import FoodDetails from "./LegacyFoodDetails";
import Table from "./LegacyTable";
import { ItemContext } from "../../context/ItemContext";

const FoodTable = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const { food_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch("http://localhost:4000/api/food", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      const filteredJson = json.filter((item: any) =>
        food_id.includes(item._id)
      );
      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: filteredJson });
      }
    };
    if (user) {
      fetchFood();
    }
  }, [dispatch, user, food_id]);

  const tableHeader = ["#", "Date", "Title", "Price", "Action"];

  return (
    <>
      <Table tableHeader={tableHeader}>
        {food && food.map((food) => <FoodDetails key={food._id} food={food} />)}
      </Table>
      <div>{food?.length === 0 && "No records"}</div>
    </>
  );
};

export default FoodTable;