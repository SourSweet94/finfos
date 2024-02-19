import { useContext, useState } from "react";
import { ScreenContext } from "../context/ScreenContext";
import { RecordContext } from "../context/RecordContext";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";
import ActionModal from "./ActionModal";

export interface RecordProps {
  name: string;
  _id: string;
}
export interface RecordDetailsProps {
  record: RecordProps;
  styles?: any;
}
const Record = ({ record }: RecordDetailsProps) => {
  const { setScreenType, setAction, setRecordID } = useContext(ScreenContext);
  const { dispatch } = useContext(RecordContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [showActionModal, setShowActionModal] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("http://localhost:4000/api/records/" + record._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_RECORD", payload: json });
    }
  };

  const handleEdit = () => {
    setShowActionModal(true);
    setAction("E");
  };

  const handleView = () => {
    setScreenType("Action");
    setRecordID(record._id)
  };

  return (
    <>
      <tr>
        <td>{record._id}</td>
        <td>{record.name}</td>
        <td>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleView}>View</Button>
        </td>
      </tr>

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        record={record}
      />
    </>
  );
};

export default Record;
