import { useContext, useEffect, useState } from "react";
import { FoodContext, FoodProps } from "../context/FoodContext";
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
import { isEqual } from "lodash";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [dateInterval, setDateInterval] = useState<
    { startDate: Date; endDate: Date }[]
  >([]);
  const [selectedDateInterval, setSelectedDateInterval] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleDateSelect = (startDate: Date, endDate: Date) => {
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

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/food`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      const filteredJson = json.filter((food: FoodProps) => {
        const foodDate = food.date;
        const startDate = selectedDateInterval.startDate
          ? selectedDateInterval.startDate
          : "";
        const endDate = selectedDateInterval.endDate
          ? selectedDateInterval.endDate
          : "";
        return foodDate >= startDate && foodDate <= endDate;
      });

      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: filteredJson });
        console.log(food);
      }
      setLoading(false);
    };

    if (user) {
      fetchFood();
    }
  }, [dispatch, user, selectedDateInterval]);

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
              {/* {isEqual(selectedDateInterval, dateInterval[0])
                ? "Current Week"
                : `${selectedDateInterval.startDate} - ${selectedDateInterval.endDate}`} */}
              {selectedDateInterval.startDate && selectedDateInterval.endDate
                ? `${new Date(
                    selectedDateInterval.startDate
                  ).toLocaleDateString()} - ${new Date(
                    selectedDateInterval.endDate
                  ).toLocaleDateString()}`
                : "No data"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
        </Col>
      </Row>
      <Row style={{ display: "flex" }}>
        {food?.length !== 0 ? (
          food?.map((food) => {
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
          })
        ) : (
          <div>No data</div>
        )}
      </Row>
    </Container>
  );
};

export default Menu;
