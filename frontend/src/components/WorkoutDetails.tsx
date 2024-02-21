import { useContext, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import ActionModal from "./ActionModal";
import Button from "./Button";
import { ScreenContext } from "../context/ScreenContext";

export interface WorkoutProps {
  date: string;
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export interface WorkoutDetailsProps {
  workout: WorkoutProps;
  styles?: any;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const { setAction, record_id } = useContext(ScreenContext);
  const { dispatch } = useContext(WorkoutContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [showActionModal, setShowActionModal] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = () => {
    setShowActionModal(true);
    setAction("E");
  };


  return (
    <>
      <tr>
        <td>{workout._id}</td>
        <td>{new Date(workout.date).toLocaleDateString()}</td>
        <td>{workout.title}</td>
        <td>{workout.reps}</td>
        <td>{workout.load}</td>
        <td>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </td>
      </tr>

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        workout={workout}
      />
    </>
  );
};

export default WorkoutDetails;
