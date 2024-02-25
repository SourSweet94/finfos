import { ReactNode, useContext, useState } from "react";
import { Table as BSTable } from "react-bootstrap";
import Button from "./Button";
import ActionModal from "./ActionModal";
import { ScreenContext } from "../context/ScreenContext";

interface TableProps {
  tableHeader: string[];
  children: ReactNode;
}

const Table = ({ tableHeader, children }: TableProps) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const { setAction } = useContext(ScreenContext);
  const handleAddClick = () => {
    setShowActionModal(true);
    setAction("N");
  };

  return (
    <>
      <BSTable striped bordered hover style={{ width: "80%" }}>
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </BSTable>
      <Button onClick={handleAddClick}>Add</Button>
      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
      />
    </>
  );
};

export default Table;
