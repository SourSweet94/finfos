import { useContext, useState } from "react";
import { ScreenContext } from "../context/ScreenContext";
import { Table as BSTable } from "react-bootstrap";
import ActionModal from "./ActionModal";
import Button from "./Button";
import "../styles/table.css";

interface TableProps {
  headers: string[];
  data: any[] | null;
  customCol?: { [key: string]: (row: any) => React.ReactNode };
}

const NewTable = ({ headers, data, customCol }: TableProps) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const { setAction } = useContext(ScreenContext);
  const handleAddClick = () => {
    setShowActionModal(true);
    setAction("N");
  };

  return (
    <>
      <BSTable striped bordered hover>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {customCol &&
              Object.keys(customCol).map((column) => (
                <th key={column}>{column}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header.toLowerCase()]}</td>
                ))}
                {customCol &&
                  Object.values(customCol).map((renderColumn, colIndex) => (
                    <td key={headers.length + colIndex}>{renderColumn(row)}</td>
                  ))}
              </tr>
            ))}
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

export default NewTable;
