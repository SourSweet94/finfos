import { useContext, useState } from "react";
import { ScreenContext } from "../../context/ScreenContext";
import { ItemContext } from "../../context/ItemContext";
import FoodTable from "../../components/FoodTable";
import RecordTable from "../../components/RecordTable";
import Button from "../../components/Button";
import { Container } from "react-bootstrap";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";
import FoodTable2 from "../../components/FoodTable2";

const Manage = () => {
  const { screenType, setScreenType, setAction } = useContext(ScreenContext);
  const { setFoodID } = useContext(ItemContext);
  const [showActionModal, setShowActionModal] = useState(false);

  const handleAddClick = () => {
    setShowActionModal(true);
    setAction("N");
  };

  return (
    <>
      {screenType === "Browse" && (
        <RecordTable
          showActionModal={showActionModal}
          setShowActionModal={setShowActionModal}
        />
      )}

      {screenType === "Action" && (
        <>
          <Button
            onClick={() => {
              setScreenType("Browse");
              setFoodID([]);
            }}
          >
            Back
          </Button>
          <FoodTable
            showActionModal={showActionModal}
            setShowActionModal={setShowActionModal}
          />
          {/* <FoodTable2/> */}
        </>
      )}
      <div style={{ display: "flex", justifyContent: "right" }}>
        {/* <Pagination currentPage={1} maxPageShown={3} setCurrentPage={()=>{}} totalPages={10}/> */}
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleAddClick} style={{}}>
            <Icon iconName="PlusLg" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Manage;
