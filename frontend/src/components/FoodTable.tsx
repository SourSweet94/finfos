import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodContext, FoodProps } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";
import { AppContext } from "../context/AppContext";
import ActionModal from "./ActionModal";
import Button from "./Button";
import Table from "./Table";

interface FoodTableProps {
  showActionModal: boolean;
  setShowActionModal: Dispatch<SetStateAction<boolean>>;
}

const FoodTable = ({ showActionModal, setShowActionModal }: FoodTableProps) => {
  const { setAction } = useContext(ScreenContext);
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const { food_id, record_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const [selectedFood, setSelectedFood] = useState<FoodProps>();

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    if (user) {
      fetchFood();
    }
  }, [dispatch, user, food_id]);

  const handleDelete = async (food_id: string) => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/food/${record_id}/${food_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_FOOD", payload: json._id });
    }
  };

  const handleEdit = (selectedFoodID: FoodProps) => {
    const foodToEdit = food!.find((item: any) => item._id === selectedFoodID);
    setShowActionModal(true);
    setAction("E");
    setSelectedFood(foodToEdit);
  };

  const headers = ["image", "date", "title", "price"];

  const customCol = {
    Action: (row: any) => (
      <>
        <Button onClick={() => handleEdit(row._id)} variant="warning">
          Edit
        </Button>
        <Button onClick={() => handleDelete(row._id)} variant="danger">
          Delete
        </Button>
      </>
    ),
  };

  return (
    <>
      {food?.length !== 0 ? (
        <Table headers={headers} data={food} customCol={customCol} />
      ) : (
        <div>No data</div>
      )}

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        food={selectedFood}
      />
    </>
  );
};

export default FoodTable;
