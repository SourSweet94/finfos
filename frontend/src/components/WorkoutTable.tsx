import { useContext, useEffect } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import WorkoutDetails from "./WorkoutDetails";
import Table from "./Table";
import { ItemContext } from "../context/ItemContext";

const WorkoutTable = () => {
  const {
    state: { workouts },
    dispatch,
  } = useContext(WorkoutContext);
  const { record_id, workout_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `http://localhost:4000/api/records/${record_id}/workouts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      const filteredJson = json.filter((item: any) =>
        workout_id.includes(item._id)
      );
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: filteredJson });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user, workout_id]);

  const tableHeader = ["#", "Date", "Title", "Reps", "Load", "Action"];

  return (
    <Table tableHeader={tableHeader}>
      {workouts &&
        workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      {workouts?.length === 0 && <div>No records</div>}
    </Table>
  );
};

export default WorkoutTable;
