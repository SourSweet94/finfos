import { useState } from "react";
import { Table as BSTable } from "react-bootstrap";
import ActionModal from "./ActionModal";
import Text from "./Text";

interface TableProps {
  headers: string[];
  data: any[] | null;
  customCol?: { [key: string]: (row: any) => React.ReactNode };
  currentPage?: number;
  itemsPerPage?: number;
}

const Table = ({ headers, data, customCol, currentPage, itemsPerPage }: TableProps) => {
  const [showActionModal, setShowActionModal] = useState(false);

  const toCamelCase = (value: string) => {
    return value.toLowerCase().replace(/\s+(.)/g, (_, group1) => {
      return group1.toUpperCase();
    });
  };

  const calculateRowIndex = (index: number) => {
    if (currentPage && itemsPerPage) {
      return (currentPage - 1) * itemsPerPage + index + 1;
    } else {
      return index + 1;
    }
  };



  return (
    <>
      <BSTable striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
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
                <td>{calculateRowIndex(rowIndex)}</td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>
                    {row[toCamelCase(header)] === row.image ? (
                      row.image ? (
                        <img
                          src={`/uploads/${row.image}`}
                          alt={row.image}
                          style={{ width: "200px" }}
                        />
                      ) : (
                        <Text>No image</Text>
                      )
                    ) : (
                      row[toCamelCase(header)]
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
