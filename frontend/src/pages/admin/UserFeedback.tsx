import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FeedbackComment, FeedbackProps } from "../Feedback";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import { Container, Tab, Tabs } from "react-bootstrap";
import DateDropdown from "../../components/DateDropdown";

const UserFeedback = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setLoading } = useContext(AppContext);

  const [feedback, setFeedback] = useState<FeedbackProps[]>([]);

  const [selectedDateInterval, setSelectedDateInterval] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const fetchFood = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/feedback", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    const filterdJson = json.filter((feedback: FeedbackProps) => {
      const startDate = selectedDateInterval.startDate
        ? selectedDateInterval.startDate
        : "";
      const endDate = selectedDateInterval.endDate
        ? selectedDateInterval.endDate
        : "";
      return feedback.food.date >= startDate && feedback.food.date <= endDate;
    });

    if (response.ok) {
      setFeedback(filterdJson);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchFood();
    }
  }, [selectedDateInterval]);

  return (
    <Container>
      <Container>
        <Text style={{ marginRight: "10px" }}>Select a date range</Text>
        <DateDropdown
          selectedDateInterval={selectedDateInterval}
          setSelectedDateInterval={setSelectedDateInterval}
        />
      </Container>

      <div >
        <Tabs id="user-feedback-tab" className="my-3">
          {feedback.map((feedback: FeedbackProps, index) => (
            <Tab 
              eventKey={feedback.food.title}
              title={feedback.food.title}
              style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
            >
              {feedback.feedback.map((fb: FeedbackComment) => (
                <Container className="mb-4" style={{ display: "flex" }}>
                  <div style={{}}>
                    <Icon iconName="PersonCircle" size="30px" />
                  </div>
                  <div style={{ flex: 1, padding: "0 10px" }}>
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
      </div>
    </Container>
  );
};

export default UserFeedback;
