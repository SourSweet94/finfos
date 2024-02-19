import { useContext } from "react";
import RecordTable from "./RecordTable";
import WorkoutTable from "./WorkoutTable";
import { ScreenContext } from "../context/ScreenContext";
import Button from "./Button";

const Menu = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  return (
    <>
      <Button onClick={() => setScreenType("Browse")}>Back</Button>

      {screenType === "Browse" && <RecordTable />}

      {screenType === "Action" && <WorkoutTable />}
    </>
  );
};

export default Menu;
