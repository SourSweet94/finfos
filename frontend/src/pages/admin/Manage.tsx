import { useContext } from "react";
import { ScreenContext } from "../../context/ScreenContext";
import { ItemContext } from "../../context/ItemContext";
import FoodTable from "../../components/FoodTable";
import RecordTable from "../../components/RecordTable";
import Button from "../../components/Button";
import { Container } from "react-bootstrap";

const Manage = () => {
  const { screenType, setScreenType } = useContext(ScreenContext);
  const { setFoodID } = useContext(ItemContext);

  return (
    <Container>
      {screenType === "Browse" && <RecordTable />}

      {screenType === "Action" && (
        <>
          {" "}
          <Button
            onClick={() => {
              setScreenType("Browse");
              setFoodID([]);
            }}
          >
            Back
          </Button>
          <FoodTable />
        </>
      )}
    </Container>
  );
};

export default Manage;
