import { useContext } from "react";
import RecordTable from "./RecordTable";
import WorkoutTable from "./WorkoutTable";
import { ScreenContext } from "../context/ScreenContext";
import Button from "./Button";
import { ItemContext } from "../context/ItemContext";

const Menu = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setWorkoutID } = useContext(ItemContext);
  return (
    <>
      <Button
        onClick={() => {
          setScreenType("Browse");
          setWorkoutID([]);
        }}
      >
        Back
      </Button>

      {screenType === "Browse" && <RecordTable />}

      {screenType === "Action" && <WorkoutTable />}
    </>
  );
};

export default Menu;
