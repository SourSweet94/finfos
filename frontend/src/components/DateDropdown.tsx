import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { RecordProps } from "../context/RecordContext";

interface DateDropdownProps {
  selectedDateInterval: {
    startDate: Date | null;
    endDate: Date | null;
    opened?: boolean
  };
  setSelectedDateInterval: Dispatch<
    SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
      opened?: boolean;
    }>
  >;
}

const DateDropdown = ({
  selectedDateInterval,
  setSelectedDateInterval,
}: DateDropdownProps) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const [dateInterval, setDateInterval] = useState<
    { startDate: Date; endDate: Date }[]
  >([]);

  const [isOrderClosed, setIsOrderClosed] = useState<boolean>(false);

  const handleDateSelect = (startDate: Date, endDate: Date, opened: boolean) => {
    if (
      startDate === selectedDateInterval.startDate &&
      endDate === selectedDateInterval.endDate
    ) {
      return;
    }
    setSelectedDateInterval({
      startDate,
      endDate,
      opened
    });
  };

  useEffect(() => {
    const fetchDate = async () => {
      const response = await fetch(`http://localhost:4000/api/records`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const records: RecordProps[] = await response.json();
      if (response.ok) {
        setDateInterval(
          records.map((record) => ({
            startDate: record.startDate,
            endDate: record.endDate,
            opened: record.opened
          }))
        );
        setSelectedDateInterval({
          startDate: records[0].startDate,
          endDate: records[0].endDate,
          opened: records[0].opened
        });
      }
    };

    if (user) {
      fetchDate();
    }
  }, []);

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ background: "#265073" }}
      >
        {selectedDateInterval.startDate && selectedDateInterval.endDate
          ? `${new Date(
              selectedDateInterval.startDate
            ).toLocaleDateString()} - ${new Date(
              selectedDateInterval.endDate
            ).toLocaleDateString()}`
          : "No data"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ overflowY: "auto", maxHeight: "400px" }}>
        {dateInterval.map((date: any) => (
          <Dropdown.Item
            key={date.startDate}
            onClick={() => handleDateSelect(date.startDate, date.endDate, date.opened)}
          >
            {new Date(date.startDate).toLocaleDateString()} -{" "}
            {new Date(date.endDate).toLocaleDateString()}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DateDropdown;
