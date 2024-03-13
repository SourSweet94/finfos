import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../context/AuthContext";
import { FoodContext } from "../context/FoodContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";
import { FoodProps } from "../context/FoodContext";
import Button from "../components/Button";
import InfoModal from "../components/InfoModal";
import "../styles/cart.css";

const Cart = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);

  const {
    state: { food },
    dispatch,
  } = useContext(FoodContext);

  const [amount, setAmount] = useState<number>(0);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<
    { _id: string; title: string; price: number }[]
  >([]);

  const handleDelete = async ({ _id, price }: FoodProps) => {
    if (!user) {
      return;
    }
    await fetch(`http://localhost:4000/api/user/cart/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setCartItem((prev) => prev.filter((item) => item._id !== _id));
    dispatch({ type: "DELETE_FOOD", payload: _id });
    setAmount((prev) => prev - price);
  };

  const handleOrder = async () => {
    if (!user) {
      return;
    }
    if(cartItem.length === 0){
      console.log("Cart is empty")
      setShowInfoModal(false)
      return
    }
    await fetch("http://localhost:4000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ cartItem, amount }),
    });
    const response = await fetch('http://localhost:4000/api/user/cart/', {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    dispatch({ type: "SET_FOOD", payload: json });
    setAmount(0)
    setShowInfoModal(false)
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const responseCart = await fetch("http://localhost:4000/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const cartData = await responseCart.json();

      const responseFood = await fetch("http://localhost:4000/api/food", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const foodData = await responseFood.json();
      const filteredFood = foodData.filter((food: any) =>
        cartData.some((cartItem: any) => cartItem.food_id === food._id)
      );
      setCartItem(
        filteredFood.map(({ _id, title, price }: FoodProps) => ({
          _id,
          title,
          price,
        }))
      );
      dispatch({ type: "SET_FOOD", payload: filteredFood });
      setAmount(
        filteredFood.reduce((total: number, item: any) => total + item.price, 0)
      );
      setLoading(false);
    };
    if (user) {
      fetchCart();
    }
  }, []);

  return (
    <>
      {food?.length !== 0 ? (
        <Container className="border pb-3">
          <Row className="cart-header py-3 mx-3">
            <Col>Image</Col>
            <Col>Title</Col>
            <Col>Price</Col>
            <Col>Action</Col>
          </Row>
          <Row className="cart-item mx-3">
            {food?.map((food) => (
              <CartItem
                key={food._id}
                food={food}
                onDelete={() => handleDelete(food)}
              />
            ))}
          </Row>
        </Container>
      ) : (
        <div>Cart is empty</div>
      )}
      <div className="cart-amount ">
        {/* <Row> */}
          <div>Amount: {amount}</div>
          <div>
            <Button onClick={() => setShowInfoModal(true)}>Order Now</Button>
          </div>
        {/* </Row> */}
      </div>

      <InfoModal
        show={showInfoModal}
        setShow={setShowInfoModal}
        status="fail"
        headerTitle="a title"
        buttonLbl="Yes"
        onClickBtn1={handleOrder}
        buttonLbl2="No"
        onClickBtn2={() => setShowInfoModal(false)}
      >
        <div>Confirm order</div>
      </InfoModal>
    </>
  );
};

export default Cart;
