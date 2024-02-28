import { useContext } from "react";
import RecordTable from "../components/RecordTable";
import FoodTable from "../components/FoodTable";
import { ScreenContext } from "../context/ScreenContext";
import Button from "../components/Button";
import { ItemContext } from "../context/ItemContext";
import { FoodContext } from "../context/FoodContext";

const Manage = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setFoodID } = useContext(ItemContext);
  const { dispatch } = useContext(FoodContext);
  return (
    <>
      <Button
        onClick={() => {
          setScreenType("Browse");
          setFoodID([]);
          dispatch({ type: "SET_FOOD", payload: null });
        }}
      >
        Back
      </Button>

      {screenType === "Browse" && <RecordTable />}

      {screenType === "Action" && <FoodTable />}
    </>
  );
};

export default Manage;
