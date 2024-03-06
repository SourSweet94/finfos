import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import { ButtonGroup, Col, Container, Dropdown, Row } from "react-bootstrap";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`http://localhost:4000/api/food`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      const filteredJson = json.filter((item: any) => {
        const itemWeek = getISOWeek(new Date(item.date));
        return selectedWeek === 0 || itemWeek === selectedWeek;
      });
      // const selectedDates = generateWeekDates(selectedWeek);
      // console.log(selectedDates);
      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: filteredJson });
      }
    };
    if (user) {
      fetchFood();
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

  const handleWeekSelect = (week: number) => {
    setSelectedWeek(week);
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedWeek === 0 ? "All Weeks" : `Week ${selectedWeek}`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleWeekSelect(0)}>
                  All Weeks
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleWeekSelect(7)}>
                  Week 7
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleWeekSelect(8)}>
                  Week 8
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleWeekSelect(9)}>
                  Week 9
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleWeekSelect(10)}>
                  Week 10
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row style={{ display: "flex" }}>
          {food?.map((food) => {
            return (
              <FoodCard
                key={food._id}
                _id={food._id}
                title={food.title}
                price={food.price}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Menu;
