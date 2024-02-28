import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import { FoodProps } from "./FoodDetails";
import { ScreenContext } from "../context/ScreenContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RecordContext } from "../context/RecordContext";
import { ItemContext } from "../context/ItemContext";

interface FoodFormProps {
  foodDetails?: FoodProps;
  setModalShow?: Dispatch<SetStateAction<boolean>>;
}

const FoodForm = ({ foodDetails, setModalShow }: FoodFormProps) => {
  const { dispatch } = useContext(FoodContext);
  const { dispatch: dispatchRecord } = useContext(RecordContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { action } = useContext(ScreenContext);
  const { record_id} = useContext(ItemContext)

  const [date, setDate] = useState<Date | null>(
    action === "E" && foodDetails ? new Date(foodDetails.date) : null
  );
  const [title, setTitle] = useState<string | null>(
    action === "E" && foodDetails ? foodDetails.title : null
  );
  const [price, setPrice] = useState<number | null>(
    action === "E" && foodDetails ? foodDetails!.price : null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const food = { date, title, price };
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}/food${
        action === "N" ? "" : foodDetails!._id
      }`,
      {
        method: action === "N" ? "POST" : "PATCH",
        body: JSON.stringify(food),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setTitle(null);
      setPrice(null);

      if (action === "N") {
        dispatch({ type: "CREATE_FOOD", payload: json });
        const recordResp = await fetch(
          `http://localhost:4000/api/records/${record_id}`,
          {
            method: "PATCH",
            body: JSON.stringify(foodDetails),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedJson = await recordResp.json();
        dispatchRecord({ type: "UPDATE_RECORD", payload: updatedJson });
        
      } else {
        const updatedResp = await fetch(
          `http://localhost:4000/api/records/${record_id}/${
            foodDetails!._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedJson = await updatedResp.json();
        dispatch({ type: "UPDATE_FOOD", payload: updatedJson });
      }
      setModalShow!(false);

      setError(null);
    } else {
      setError(json.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <DatePicker
          selected={date}
          onChange={(selectedDate: Date | null) => setDate(selectedDate)}
          dateFormat="yyyy-MM-dd"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title === null ? "" : title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          value={price === null ? "" : price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.valueAsNumber)
          }
        />
      </Form.Group>

      <button type="submit">{action === "N" ? "Submit" : "Save"}</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default FoodForm;