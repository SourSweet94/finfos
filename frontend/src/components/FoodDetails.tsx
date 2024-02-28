import { useContext, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import ActionModal from "./ActionModal";
import Button from "./Button";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";

export interface FoodProps {
  date: string;
  _id: string;
  title: string;
  price: number;
  createdAt: string;
}

export interface FoodDetailsProps {
  food: FoodProps;
  styles?: any;
}

const FoodDetails = ({ food }: FoodDetailsProps) => {
  const { setAction } = useContext(ScreenContext);
  const { dispatch } = useContext(FoodContext);
  const { record_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [showActionModal, setShowActionModal] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}/food/${food._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_FOOD", payload: json });
    }
  };

  const handleEdit = () => {
    setShowActionModal(true);
    setAction("E");
  };

  return (
    <>
      <tr>
        <td>{food._id}</td>
        <td>{new Date(food.date).toLocaleDateString()}</td>
        <td>{food.title}</td>
        <td>{food.price}</td>
        <td>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </td>
      </tr>

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        food={food}
      />
    </>
  );
};

export default FoodDetails;
