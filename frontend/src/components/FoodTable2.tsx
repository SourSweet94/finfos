import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../context/ScreenContext";
import { FoodContext } from "../context/FoodContext";
import { ItemContext } from "../context/ItemContext";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { RecordProps } from "../context/RecordContext";
import Button from "./Button";
import ActionModal from "./ActionModal";

const FoodTable2 = () => {
  const { setAction } = useContext(ScreenContext);
  const {
    // state: { food },
    dispatch,
  } = useContext(FoodContext);
  // const {
  //   state: { records },
  //   dispatch: dispatchRecords,
  // } = useContext(RecordContext);
  const { food_id, record_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const [dateInterval, setDateInterval] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [dateArray, setDateArray] = useState<string[]>([]);

  const [showActionModal, setShowActionModal] = useState(false);

  const [selectedFoodDate, setSelectedFoodDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/records/${record_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json: RecordProps = await response.json();
      // const filteredJson = json.filter((item: any) =>
      //   food_id.includes(item._id)
      // );
      if (response.ok) {
        setDateInterval({ startDate: json.startDate, endDate: json.endDate });
      }

      setLoading(false);
    };
    if (user) {
      fetchDate();
    }
  }, [dispatch, user, food_id]);

  useEffect(() => {
    if (dateInterval.startDate && dateInterval.endDate) {
      setDateArray(getDates(dateInterval.startDate, dateInterval.endDate));
    }
  }, [dateInterval]);

  const getDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toLocaleDateString().substring(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleAdd = (date: string) => {
    setShowActionModal(true);
    setSelectedFoodDate(new Date(date));
    setAction("N");
  };

  return (
    <div>
      <div>
        {dateArray.map((date, index) => (
          <div key={index}>
            {date}
            <Button onClick={() => handleAdd(date)}>Add</Button>
          </div>
        ))}
      </div>

      <ActionModal
        buttonLabel="test"
        show={showActionModal}
        setShow={setShowActionModal}
        data={selectedFoodDate}
      />
    </div>
  );
};

export default FoodTable2;
