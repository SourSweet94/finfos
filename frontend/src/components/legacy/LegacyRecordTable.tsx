import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Table from "./LegacyTable";
import { RecordContext } from "../../context/RecordContext";
import Record from "./LegacyRecord";

const RecordTable = () => {
  const {
    state: { records },
    dispatch,
  } = useContext(RecordContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch("http://localhost:4000/api/records", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_RECORD", payload: json });
      }
    };
    if (user) {
      fetchRecords();
    }
  }, [dispatch, user]);

  const tableHeader = ["#", "name", "action"];

  return (
    <>
      <Table tableHeader={tableHeader}>
        {records &&
          records.map((record) => <Record key={record._id} record={record} />)}
      </Table>
      {records?.length === 0 && <div>No records</div>}
    </>
  );
};

export default RecordTable;