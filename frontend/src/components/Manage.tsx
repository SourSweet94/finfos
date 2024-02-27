import { useContext } from "react";
import RecordTable from "./RecordTable";
import WorkoutTable from "./WorkoutTable";
import { ScreenContext } from "../context/ScreenContext";
import Button from "./Button";
import { ItemContext } from "../context/ItemContext";
import { WorkoutContext } from "../context/WorkoutContext";

const Manage = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setWorkoutID } = useContext(ItemContext);
  const { dispatch } = useContext(WorkoutContext);
  return (
    <>
      <Button
        onClick={() => {
          setScreenType("Browse");
          setWorkoutID([]);
          dispatch({ type: "SET_WORKOUT", payload: null });
        }}
      >
        Back
      </Button>

      {screenType === "Browse" && <RecordTable />}

      {screenType === "Action" && <WorkoutTable />}
    </>
  );
};

export default Manage;
