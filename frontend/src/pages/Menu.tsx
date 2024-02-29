import { useContext, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import { Col, Container, Row } from "react-bootstrap";

const Menu = () => {
  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);
  // const { record_id, food_id } = useContext(ItemContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`http://localhost:4000/api/food`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FOOD", payload: json });
      }
    };
    if (user) {
      fetchFood();
    }
  }, [dispatch, user]);

  console.log(food);

  return (
    <>
      <Container>
        <Row style={{display: 'flex'}}>
          {food?.map((food) => {
          return (
            <FoodCard key={food._id} title={food.title} price={food.price} />
          );
        })}
        </Row>
        
      </Container>
    </>
  );
};

export default Menu;
