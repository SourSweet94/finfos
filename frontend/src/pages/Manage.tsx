import { useContext } from "react";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";
import FoodTable from "../components/FoodTable";
import RecordTable from "../components/RecordTable";
import Button from "../components/Button";

const Manage = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setFoodID } = useContext(ItemContext);

  return (
    <>
      <Button
        onClick={() => {
          setScreenType("Browse");
          setFoodID([]);
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
