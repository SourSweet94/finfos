import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "../components/Button";

const Feedback = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);
  const [order, setOrder] = useState([]);

  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/order/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(json);
      setOrder(json);
      setLoading(false);
    };

    const fetchFeedback = async () => {
      const response = await fetch("http://localhost:4000/api/feedback", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      const getFoodID = (json: any, user_id: any) => {
        for (const feedback of json) {
          for (const feedbackItem of feedback.feedback) {
            if (feedbackItem.user_id === user_id) {
              return feedback.food_id;
            }
          }
        }
        return null; // If no matching user_id found in feedback objects
      };
      const foodID = getFoodID(json, user.user_id);
      console.log(foodID)
    };
    if (user) {
      fetchOrder();
      fetchFeedback();
    }
  }, []);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    food_id: string
  ) => {
    e.preventDefault();
    if (!comments[food_id] || !comments[food_id].replace(/\s/g, "").length) {
      setError({ [food_id]: "Comment cannot be blank" });
      return;
    }
    const response = await fetch(
      `http://localhost:4000/api/feedback/${food_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comments[food_id] }),
      }
    );

    // setComments({})
  };

  return (
    <Container className="border py-3">
      {order.length !== 0 ? (
        order.map((order: any) => (
          <Container key={order._id}>
            <div
              style={{
                background: "#ededed",
                borderRadius: "10px",
              }}
            >
              Order #{order._id}
            </div>

            <ol>
              {order.items.map((item: any) => (
                <li key={item._id}>
                  <Container className="py-3">
                    <Row>
                      <Col>
                        {new Date(item.food_date).toLocaleDateString("en-GB")}
                      </Col>
                      <Col>{item.food_title}</Col>
                    </Row>
                    <form onSubmit={(e) => handleSubmit(e, item.food_id)}>
                      <Form.Label>Comment</Form.Label>
                      <div style={{ display: "flex" }}>
                        <Form.Control
                          style={{ marginRight: "10px" }}
                          type="text"
                          placeholder="..."
                          // value={comments[item._id] || ""}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setComments((prevComments) => ({
                              ...prevComments,
                              [item.food_id]: e.target.value,
                            }));
                          }}
                        />
                        <Button type="submit" onClick={() => {}}>
                          Submit
                        </Button>
                      </div>
                      {error && (
                        <div style={{ height: "20px" }}>
                          {error[item.food_id]}
                        </div>
                      )}
                    </form>
                  </Container>
                </li>
              ))}
            </ol>
            <hr />
          </Container>
        ))
      ) : (
        <div>Order is empty</div>
      )}
    </Container>
  );
};

export default Feedback;
