import { useContext, useEffect, useState } from "react";
import { FoodContext, FoodProps } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";
import { Order } from "./Order";
import FoodCard from "../components/FoodCard";
import InfoModal from "../components/InfoModal";
import DateDropdown from "../components/DateDropdown";
import Text from "../components/Text";

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
    opened?: boolean;
  }>({
    startDate: null,
    endDate: null,
    opened: false
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchFood = async () => {
    const response = await fetch(`http://localhost:4000/api/food`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const food: FoodProps[] = await response.json();
    const filteredFood = food.filter((food) => {
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
      dispatch({ type: "SET_FOOD", payload: filteredFood });
    }
  };

  const fetchOrder = async () => {
    const response = await fetch("http://localhost:4000/api/order/user", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const orders: Order[] = await response.json();
    setOrders(orders);
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchFood();
      fetchOrder();
      setLoading(false);
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
                isOrdered={orders.some((order) =>
                  order.items.some((item) => item.food_id === food._id)
                )}
                opened={selectedDateInterval.opened}
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
