import { useContext } from "react";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";
import FoodTable from "../components/FoodTable";
import RecordTable from "../components/RecordTable";
import Button from "../components/Button";
import { Container } from "react-bootstrap";

const Manage = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setFoodID } = useContext(ItemContext);

  return (
    <Container>
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

    </Container>
  );
};

export default Manage;
