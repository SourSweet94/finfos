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
import { FoodProps } from "../context/FoodContext";
import { ScreenContext } from "../context/ScreenContext";
import { RecordContext } from "../context/RecordContext";
import { ItemContext } from "../context/ItemContext";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FoodFormProps {
  date: any;
  foodDetails?: FoodProps;
  setModalShow?: Dispatch<SetStateAction<boolean>>;
}

const FoodForm2 = ({ date, foodDetails, setModalShow }: FoodFormProps) => {
  const { dispatch } = useContext(FoodContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { action } = useContext(ScreenContext);
  const { record_id } = useContext(ItemContext);

  const [image, setImage] = useState<File | null>(null);

  // const [date, setDate] = useState<Date | null>(
  //   action === "E" && foodDetails ? new Date(foodDetails.date) : null
  // );
  const [title, setTitle] = useState<string | null>(
    action === "E" && foodDetails ? foodDetails.title : null
  );
  const [price, setPrice] = useState<number | null>(
    action === "E" && foodDetails ? foodDetails!.price : null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const food = {image, date, title, price };
    const response = await fetch(
      `http://localhost:4000/api/food/${record_id}/${
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

    // await fetch('http://localhost:4000/api/food/upload-image', {
    //   method: "POST",
    //   body: JSON.stringify(image),
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${user.token}`,
    //   }
    // })

    const json = await response.json();

    if (response.ok) {
      setTitle(null);
      setPrice(null);

      if (action === "N") {
        dispatch({ type: "CREATE_FOOD", payload: json });
      } else {
        const updatedResp = await fetch(
          `http://localhost:4000/api/food/${record_id}/${foodDetails!._id}`,
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div>{date}</div>

      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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

      <Button type="submit" onClick={() => {}}>
        {action === "N" ? "Submit" : "Save"}
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default FoodForm2;