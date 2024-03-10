import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import { RecordContext } from "../context/RecordContext";
import { AuthContext } from "../context/AuthContext";
import { ScreenContext } from "../context/ScreenContext";
import { RecordProps } from "./legacy/LegacyRecord";
import Button from "./Button";

interface RecordFormProps {
  record?: RecordProps;
  setModalShow?: Dispatch<SetStateAction<boolean>>;
}

const RecordForm = ({ record, setModalShow }: RecordFormProps) => {
  const { dispatch } = useContext(RecordContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { action } = useContext(ScreenContext);

  const [name, setName] = useState<string | null>(
    action === "E" && record ? record.name : null
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const record = { name };

    const response = await fetch(
      `http://localhost:4000/api/records/${
        action === "N" ? "" : record!._id
      }`,
      {
        method: action === "N" ? "POST" : "PATCH",
        body: JSON.stringify({name}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      // update UI
      setName(null)
      console.log(action)
      if (action === "N") {
        dispatch({ type: "CREATE_RECORD", payload: json });
      } else if (action === "E") {
        const updatedResp = await fetch(
          `http://localhost:4000/api/records/${record!._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedJson = await updatedResp.json();
        dispatch({ type: "UPDATE_RECORD", payload: updatedJson });
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name === null ? "" : name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </Form.Group>

      <Button type="submit" onClick={()=>{}}>{action === "N" ? "Submit" : "Save"}</Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default RecordForm;
