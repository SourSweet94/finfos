import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import {
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { RecordProps } from "../context/RecordContext";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [dateInterval, setDateInterval] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/food`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      const filteredJson = json.filter((item: any) => {
        const itemWeek = getISOWeek(new Date(item.date));
        return selectedWeek === 0 || itemWeek === selectedWeek;
      });
      // const selectedDates = generateWeekDates(selectedWeek);
      // console.log(selectedDates);
      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: filteredJson });
      }
      setLoading(false);
    };

    const fetchDate = async () => {
      const response = await fetch(`http://localhost:4000/api/records`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      setDateInterval(
        json.map((record: RecordProps) => ({
          startDate: record.startDate,
          endDate: record.endDate,
        }))
      );
    };
    if (user) {
      fetchFood();
      fetchDate();
    }
  }, [dispatch, user, selectedWeek]);

  const getISOWeek = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.round(
      (date.getTime() - firstDayOfYear.getTime()) / (24 * 3600 * 1000)
    );
    const isoWeek = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
    return isoWeek;
  };

  // const generateWeekDates = (week: number) => {
  //   const currentDate = new Date();
  //   const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  //   const firstDayOfWeek = new Date(firstDayOfYear);
  //   firstDayOfWeek.setDate(
  //     firstDayOfYear.getDate() + (week - 1) * 7 - firstDayOfYear.getDay()
  //   );

  //   const dates = Array.from({ length: 7 }, (_, index) => {
  //     const date = new Date(firstDayOfWeek);
  //     //from Sunday to Saturday
  //     date.setDate(firstDayOfWeek.getDate() + index + 1);
  //     return date.toISOString().substring(0, 10);
  //   });

  //   return dates;
  // };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    // setSelectedWeek(week);
  };
  return (
    <Container className="menu-container">
      {/* <ToastContainer position="middle-center">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </ToastContainer> */}
      <Row>
        <Col>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedWeek === 0 ? "All Weeks" : `Week ${selectedWeek}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {dateInterval.map((date: any) => (
                <Dropdown.Item
                  key={date.startDate}
                  onClick={() => handleDateSelect(date.startDate, date.endDate)}
                >
                  {date.startDate} - {date.endDate}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row style={{ display: "flex" }}>
        {food?.map((food) => {
          return (
            <FoodCard
              key={food._id}
              food={{
                date: food.date,
                _id: food._id,
                title: food.title,
                price: food.price,
              }}
              setShowToast={setShowToast}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default Menu;
