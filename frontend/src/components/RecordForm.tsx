import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import { RecordContext, RecordProps } from "../context/RecordContext";
import { AuthContext } from "../context/AuthContext";
import { ScreenContext } from "../context/ScreenContext";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/recordForm.css'

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

  const [startDate, setStartDate] = useState<Date | null>(
    action === "E" && record ? new Date(record.startDate) : null
  );

  const [endDate, setEndDate] = useState<Date | null>(
    action === "E" && record ? new Date(record.endDate) : null
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/records/${
        action === "N" ? "" : record!._id
      }`,
      {
        method: action === "N" ? "POST" : "PATCH",
        body: JSON.stringify({startDate, endDate}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setStartDate(null)
      setEndDate(null)
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
        console.log(updatedJson)
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
        <Form.Label className="form-label">Start Date</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={(selectedDate: Date | null) => setStartDate(selectedDate)}
          dateFormat="dd-MM-yyyy"
          maxDate={endDate}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">End Date</Form.Label>
        <DatePicker
          selected={endDate}
          onChange={(selectedDate: Date | null) => setEndDate(selectedDate)}
          dateFormat="dd-MM-yyyy"
          minDate={startDate}
        />
      </Form.Group>

      <Button type="submit">{action === "N" ? "Submit" : "Save"}</Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default RecordForm;
