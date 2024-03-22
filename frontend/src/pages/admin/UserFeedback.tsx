import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../context/ScreenContext";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FeedbackComment, FeedbackProps } from "../Feedback";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import { Container, Tab, Tabs } from "react-bootstrap";
// import DateDropdown from "../../components/DateDropdown";

const UserFeedback = () => {
  const { setAction } = useContext(ScreenContext);

  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const [feedback, setFeedback] = useState<FeedbackProps[]>([]);

  const fetchFood = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/feedback", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setFeedback(json);
    }
    console.log(json);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchFood();
    }
  }, []);

  return (
    <Container>
      {/* <DateDropdown
        dateInterval={}
        selectedDateInterval={}
        handleDateSelect={}
      /> */}
      <Tabs id="uncontrolled-tab-example" className="mb-3">
        {feedback.map((feedback: FeedbackProps) => (
          <Tab eventKey={feedback.food.title} title={feedback.food.title}>
            {feedback.feedback.map((fb: FeedbackComment) => (
              <Container className="my-3" style={{ display: "flex" }}>
                <div style={{background: 'yellow'}}>
                  <Icon iconName="PersonCircle" size="30px" />
                </div>
                <div style={{ flex: 1, padding: "0 10px", background: 'pink' }}>
                  <div>
                    <strong>{fb.user.email}</strong>
                  </div>
                  <div>
                    <Text>{fb.user.comment}</Text>
                  </div>
                </div>
              </Container>
            ))}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default UserFeedback;
