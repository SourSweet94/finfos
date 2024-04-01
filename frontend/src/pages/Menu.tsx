import { useContext, useEffect, useState } from "react";
import { FoodContext, FoodProps } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import { Col, Container, Row } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import InfoModal from "../components/InfoModal";
import Text from "../components/Text";
import DateDropdown from "../components/DateDropdown";

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

  const [selectedDateInterval, setSelectedDateInterval] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/food`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json: FoodProps[] = await response.json();
      const filteredJson = json.filter((food) => {
        const startDate = selectedDateInterval.startDate
          ? selectedDateInterval.startDate
          : "";
        const endDate = selectedDateInterval.endDate
          ? selectedDateInterval.endDate
          : "";
        return food.date >= startDate && food.date <= endDate;
      });
      // REMEMBER TO CHANGE TO filteredJson
      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: filteredJson });
      }
      setLoading(false);
    };

    if (user) {
      fetchFood();
    }
  }, [selectedDateInterval]);

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
          <DateDropdown
            selectedDateInterval={selectedDateInterval}
            setSelectedDateInterval={setSelectedDateInterval}
          />
        </Col>
      </Row>
      <Row className="my-3">
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
          closeButton={false}
          bsModalProps={{ backdrop: true, animation: false }}
        >
          <Text>Item has been added in your cart</Text>
        </InfoModal>
      )}
    </Container>
  );
};

export default Menu;
