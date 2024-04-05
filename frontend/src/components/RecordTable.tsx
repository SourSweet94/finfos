import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { ScreenContext } from "../context/ScreenContext";
import { ItemContext } from "../context/ItemContext";
import { AppContext } from "../context/AppContext";
import { RecordContext, RecordProps } from "../context/RecordContext";
import ActionModal from "./ActionModal";
import Button from "./Button";
import Table from "./Table";
import InfoModal from "./InfoModal";

interface RecordTableProps {
  showActionModal: boolean;
  setShowActionModal: Dispatch<SetStateAction<boolean>>;
}

const RecordTable = ({
  showActionModal,
  setShowActionModal,
}: RecordTableProps) => {
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

  const [selectedRecord, setSelectedRecord] = useState<RecordProps>();
  const [deleteRecordId, setDeleteRecordId] = useState<string>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const [cliked, setCliked] = useState<"Delete" | "Close" | "">("");

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/records", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        dispatch({ type: "SET_RECORD", payload: json });
      }
      setLoading(false);
    };
    if (user) {
      fetchRecord();
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

  const handleEdit = (selectedRecordID: string) => {
    const recordToEdit = records!.find(
      (item: RecordProps) => item._id === selectedRecordID
    );
    setShowActionModal(true);
    setAction("E");
    setSelectedRecord(recordToEdit!);
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
      setDeleteRecordId("");
    }
  };

  const headers = ["Start Date", "End Date"];

  const renderButtons = (rowId: string) => {
    const actions = [
      { label: "View", onClick: () => handleView(rowId) },
      { label: "Edit", variant: "warning", onClick: () => handleEdit(rowId) },
      {
        label: "Delete",
        variant: "danger",
        // onClick: () => handleDelete(rowId),
        onClick: () => {
          setCliked("Delete");
          setDeleteRecordId(rowId);
          setShowInfoModal(true);
        },
      },
      {
        label: "Close order",
        onClick: () => {
          setCliked("Close");
          setShowInfoModal(true);
        },
      },
    ];

    return actions.map(({ label, variant, onClick }) => (
      <Button
        key={`${label}-${rowId}`}
        onClick={onClick}
        variant={variant}
        style={{ margin: "0 10px 10px" }}
      >
        {label}
      </Button>
    ));
  };

  const customCol = {
    Action: (row: any) => renderButtons(row._id),
  };

  const handleCloseOrder = () => {
    console.log("close");
  };

  return (
    <>
      {records?.length !== 0 ? (
        <Table headers={headers} data={records} customCol={customCol} />
      ) : (
        <div>No data</div>
      )}

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        data={selectedRecord}
      />

      <InfoModal
        show={showInfoModal}
        setShow={setShowInfoModal}
        headerTitle={cliked === "Delete" ? "Delete" : "Close Order"}
        buttonLbl1="Yes"
        onClickBtn1={() => {
          setShowInfoModal(false);
          cliked === "Delete"
            ? handleDelete(deleteRecordId!)
            : handleCloseOrder;
        }}
        buttonLbl2="No"
        onClickBtn2={() => {
          setShowInfoModal(false);
        }}
      />
    </>
  );
};

export default RecordTable;
