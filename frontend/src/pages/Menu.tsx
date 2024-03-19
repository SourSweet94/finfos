import { useContext, useEffect, useState } from "react";
import { FoodContext, FoodProps } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import { ButtonGroup, Col, Container, Dropdown, Row } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { RecordProps } from "../context/RecordContext";
import InfoModal from "../components/InfoModal";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
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
      // REMEMBER TO CHANGE TO filteredJson
      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: json });
        console.log(food);
      }
      setLoading(false);
    };

    if (user) {
      fetchFood();
    }
  }, [dispatch, user, selectedDateInterval]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (showInfoModal) {
      timer = setTimeout(() => {
        setShowInfoModal(false);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showInfoModal]);

  return (
    <Container className="menu-container">
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
      <Row >
        {food?.length !== 0 ? (
          food?.map((food) => {
            return (
              <FoodCard
                key={food._id}
                food={{
                  image: food.image,
                  date: food.date,
                  _id: food._id,
                  title: food.title,
                  price: food.price,
                }}
                setShowInfoModal={setShowInfoModal}
              />
            );
          })
        ) : (
          <div>No data</div>
        )}
      </Row>
      {showInfoModal && (
        <InfoModal
          show={showInfoModal}
          setShow={setShowInfoModal}
          status="success"
          // headerTitle="lalala"
          closeButton={false}
          bsModalProps={{ backdrop: true, animation: false }}
        ><span>Item has been added in your cart</span></InfoModal>
      )}
    </Container>
  );
};

export default Menu;
