import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";
import { AppContext } from "../context/AppContext";
import { RecordContext, RecordProps } from "../context/RecordContext";
import ActionModal from "./ActionModal";
import Button from "./Button";
import Table from "./Table";

const RecordTable = () => {
  const { setScreenType, setAction } = useContext(ScreenContext);
  const {
    state: { records },
    dispatch,
  } = useContext(RecordContext);
  const { setRecordID, setFoodID } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordProps>();

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/records", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json)
      if (response.ok) {
        dispatch({ type: "SET_RECORD", payload: json });
      }
      setLoading(false);
    };
    if (user) {
      fetchFood();
    }
  }, [dispatch, user]);

  const handleView = async (record_id: string) => {
    setLoading(true);
    setScreenType("Action");
    setRecordID(record_id);

    const response = await fetch(
      "http://localhost:4000/api/records/" + record_id,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const currentRecord = await response.json();
    if (response.ok) {
      // the food_id array from current viewed Record
      setFoodID(currentRecord.food_id);
    }
    setLoading(false);
  };

  const handleDelete = async (record_id: string) => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/records/" + record_id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_RECORD", payload: json });
    }
  };

  const handleEdit = (selectedRecordID: string) => {
    const recordToEdit = records!.find(
      (item: any) => item._id === selectedRecordID
    );
    setShowActionModal(true);
    setAction("E");
    setSelectedRecord(recordToEdit);
  };

  const headers = ["startDate", "endDate"];

  const customCol = {
    Action: (row: any) => (
      <>
        <Button onClick={() => handleView(row._id)}>View</Button>
        <Button onClick={() => handleEdit(row._id)} variant="warning">
          Edit
        </Button>
        <Button onClick={() => handleDelete(row._id)} variant="danger">
          Delete
        </Button>
      </>
    ),
  };
console.log(selectedRecord)
  return (
    <>
      <Table headers={headers} data={records} customCol={customCol} />

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        record={selectedRecord}
      />
    </>
  );
};

export default RecordTable;
