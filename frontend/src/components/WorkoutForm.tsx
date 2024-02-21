import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import { WorkoutProps } from "./WorkoutDetails";
import { ScreenContext } from "../context/ScreenContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface WorkoutFormProps {
  workoutDetails?: WorkoutProps;
  setModalShow?: Dispatch<SetStateAction<boolean>>;
}

const WorkoutForm = ({ workoutDetails, setModalShow }: WorkoutFormProps) => {
  const { dispatch } = useContext(WorkoutContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { action, record_id } = useContext(ScreenContext);

  const [date, setDate] = useState<Date | null>(
    action === "E" && workoutDetails ? new Date(workoutDetails.date) : null
  );
  const [title, setTitle] = useState<string | null>(
    action === "E" && workoutDetails ? workoutDetails.title : null
  );
  const [reps, setReps] = useState<number | null>(
    action === "E" && workoutDetails ? workoutDetails!.reps : null
  );
  const [load, setLoad] = useState<number | null>(
    action === "E" && workoutDetails ? workoutDetails!.load : null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { date, title, reps, load };
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}/${action === "N" ? "" : workoutDetails!._id}`,
      {
        method: action === "N" ? "POST" : "PATCH",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setTitle(null);
      setReps(null);
      setLoad(null);

      if (action === "N") {
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      } else {
        const updatedResp = await fetch(
          `http://localhost:4000/api/records/${record_id}/${
            workoutDetails!._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedJson = await updatedResp.json();
        dispatch({ type: "UPDATE_WORKOUT", payload: updatedJson });
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
        <Form.Label>Reps</Form.Label>
        <Form.Control
          type="number"
          placeholder="Reps"
          value={reps === null ? "" : reps}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReps(e.target.valueAsNumber)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Load</Form.Label>
        <Form.Control
          type="number"
          placeholder="Load"
          value={load === null ? "" : load}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLoad(e.target.valueAsNumber)
          }
        />
      </Form.Group>

      <button type="submit">{action === "N" ? "Submit" : "Save"}</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
