import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Text from "../components/Text";

export interface FeedbackComment {
  user: { _id: string; email: string; comment: string };
}

export interface FeedbackProps {
  food: {
    _id: string;
    title: string;
    date: Date;
  };
  feedback: FeedbackComment[];
}

const Feedback = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);
  const [order, setOrder] = useState([]);

  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [commented, setCommented] = useState<string[]>([]);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const fetchOrder = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/order/user", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      setOrder(json);
    }
    setLoading(false);
  };

  const fetchWrittenFeedback = async () => {
    // setLoading(true);
    const response = await fetch("http://localhost:4000/api/feedback", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      const filteredJson = json
        .filter((feedback: FeedbackProps) =>
          feedback.feedback.some(
            (item: FeedbackComment) => item.user._id === user.user_id
          )
        )
        .map((feedback: FeedbackProps) => feedback.food._id);
      setCommented(filteredJson);
    }
    // setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrder();
      fetchWrittenFeedback();
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
    await fetch(`http://localhost:4000/api/feedback/${food_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comments[food_id] }),
    });
    fetchWrittenFeedback();
  };

  return (
    <Container className="border py-3 mb-3">
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
                      <Col>
                        {item.food_image ? (
                          <Image
                            src={`../../public/uploads/${item.food_image}`}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <Text>No image</Text>
                        )}
                      </Col>
                    </Row>
                    <form onSubmit={(e) => handleSubmit(e, item.food_id)}>
                      <Form.Label>Comment</Form.Label>
                      <div style={{ display: "flex" }}>
                        <Form.Control
                          style={{ marginRight: "10px" }}
                          type="text"
                          placeholder="..."
                          // value={commented.find((comment: string)=>comment === )}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setComments((prevComments) => ({
                              ...prevComments,
                              [item.food_id]: e.target.value,
                            }));
                          }}
                          disabled={commented.includes(item.food_id)}
                        />
                        {commented.find(
                          (food_id: string) => food_id === item.food_id
                        ) ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "fit-content",
                            }}
                          >
                            <Text
                              style={{ textWrap: "nowrap", padding: "0 10px" }}
                            >
                              Thanks for your feedback
                            </Text>
                            <Icon
                              iconName="CheckLg"
                              color="green"
                              size="30px"
                            />
                          </div>
                        ) : (
                          <Button type="submit" onClick={() => {}}>
                            Submit
                          </Button>
                        )}
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
        <Text>You can give feedback after ordering 🤭</Text>
      )}
    </Container>
  );
};

export default Feedback;
