import { useState } from "react";
import { Table as BSTable } from "react-bootstrap";
import ActionModal from "./ActionModal";
import "../styles/table.css";

interface TableProps {
  headers: string[];
  data: any[] | null;
  customCol?: { [key: string]: (row: any) => React.ReactNode };
}

const Table = ({ headers, data, customCol }: TableProps) => {
  const [showActionModal, setShowActionModal] = useState(false);

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
                  <td key={colIndex}>
                    {row[header] === row.image ? (
                      row.image ? (
                        <img
                          src={`../../public/uploads/${row.image}`}
                          alt={row.image}
                          style={{ width: "200px" }}
                        />
                      ) : (
                        <text>No image</text>
                      )
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
                {customCol &&
                  Object.values(customCol).map((renderColumn, colIndex) => (
                    <td key={headers.length + colIndex}>{renderColumn(row)}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </BSTable>

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
      />
    </>
  );
};

export default Table;
