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
import Text from "./Text";
import Icon, { IconProps } from "./Icon";

interface RecordTableProps {
  showActionModal: boolean;
  setShowActionModal: Dispatch<SetStateAction<boolean>>;
}

interface ActionButton {
  label: string;
  iconName?: IconProps["iconName"];
  variant?: string;
  onClick: () => void;
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
  const { record_id, setRecordID, setFoodID } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);
  const { setSelectedDateInterval } = useContext(ItemContext);
  const [selectedRecord, setSelectedRecord] = useState<RecordProps>();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<"Delete" | "Close" | "">("");

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/records", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const food = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_RECORD", payload: food });
      }
      setLoading(false);
    };
    if (user) {
      fetchRecord();
    }
  }, [dispatch]);

  const handleView = async (record_id: string) => {
    setLoading(true);
    setScreenType("Action");
    setRecordID(record_id);

    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}`,
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
      setSelectedDateInterval({
        startDate: currentRecord.startDate,
        endDate: currentRecord.endDate,
      });
    }
    setLoading(false);
  };

  const handleEdit = (selectedRecordID: string) => {
    const recordToEdit = records!.find(
      (item: RecordProps) => item._id === selectedRecordID
    );
    setShowActionModal(true);
    setAction("E");
    setSelectedRecord(recordToEdit);
  };

  const handleDelete = async (record_id: string) => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const record: RecordProps = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_RECORD", payload: record });
    }
  };

  const handleCloseOrder = async (record_id: string) => {
    const response = await fetch(
      `http://localhost:4000/api/records/${record_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ opened: true }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      // display the latest data
      const updatedResp = await fetch(
        `http://localhost:4000/api/records/${record_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updatedRecord: RecordProps = await updatedResp.json();
      dispatch({ type: "UPDATE_RECORD", payload: updatedRecord });
    }
  };

  const headers = ["Start Date", "End Date"];

  const renderButtons = (rowId: string) => {
    const actions: ActionButton[] = [
      { label: "View", iconName: "Eye", onClick: () => handleView(rowId) },
      {
        label: "Edit",
        iconName: "PencilSquare",
        variant: "warning",
        onClick: () => handleEdit(rowId),
      },
      {
        label: "Delete",
        iconName: "Trash3",
        variant: "danger",
        onClick: () => {
          setClicked("Delete");
          setRecordID(rowId);
          setShowInfoModal(true);
        },
      },
      {
        label: records!.find((record) => record._id === rowId)!.opened
          ? "Close order"
          : "Open order",
        variant: "dark",
        onClick: () => {
          setClicked("Close");
          setRecordID(rowId);
          setShowInfoModal(true);
        },
      },
    ];
    return actions.map(({ label, iconName, variant, onClick }) => (
      <Button
        key={`${label}-${rowId}`}
        onClick={onClick}
        variant={variant}
        style={{ margin: "0 10px 10px", minWidth: "auto" }}
      >
        {!iconName ? label : <Icon iconName={iconName} />}
      </Button>
    ));
  };

  const renderTags = (tag: "open" | "close") => (
    <Text
      style={{
        color: tag === "open" ? "#114232" : "#A0153E",
        backgroundColor: tag === "open" ? "#90D26D" : "#F28585",
        border: "solid",
        borderRadius: "5px",
        padding: "3px",
        minWidth: "100px",
      }}
    >
      {tag === "open" ? "Opened" : "Closed"}
    </Text>
  );

  const customCol = {
    Tag: (row: RecordProps) => renderTags(row.opened ? "open" : "close"),
    Action: (row: RecordProps) => renderButtons(row._id),
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
        headerTitle={
          clicked === "Delete"
            ? "Delete"
            : records?.find((record) => record._id === record_id)?.opened
            ? "Close Order"
            : "Open Order"
        }
        buttonLbl1="Yes"
        onClickBtn1={() => {
          setShowInfoModal(false);
          clicked === "Delete"
            ? handleDelete(record_id!)
            : handleCloseOrder(record_id!);
        }}
        buttonLbl2="No"
        onClickBtn2={() => {
          setShowInfoModal(false);
        }}
        status="warning"
      >
        <Text>
          Confirm
          {clicked === "Delete"
            ? " delete "
            : records?.find((record) => record._id === record_id)?.opened
            ? " close "
            : " open "}
          order
        </Text>
      </InfoModal>
    </>
  );
};

export default RecordTable;
