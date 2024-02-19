import { useContext, useEffect } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import WorkoutDetails from "./WorkoutDetails";
import Table from "./Table";
import { ScreenContext } from "../context/ScreenContext";

const WorkoutTable = () => {
  const {
    state: { workouts },
    dispatch,
  } = useContext(WorkoutContext);
  const { record_id } = useContext(ScreenContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "http://localhost:4000/api/workouts/record/" + record_id,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

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
