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
  };
  setSelectedDateInterval: Dispatch<
    SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
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

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    if (
      startDate === selectedDateInterval.startDate &&
      endDate === selectedDateInterval.endDate
    ) {
      return
    }
    setSelectedDateInterval({
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    const fetchDate = async () => {
      const response = await fetch(`http://localhost:4000/api/records`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json: RecordProps[] = await response.json();
      if (response.ok) {
        setDateInterval(
          json.map((record: RecordProps) => ({
            startDate: record.startDate,
            endDate: record.endDate,
          }))
        );
        setSelectedDateInterval({
          startDate: json[0]?.startDate,
          endDate: json[0]?.endDate,
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
            onClick={() => handleDateSelect(date.startDate, date.endDate)}
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
