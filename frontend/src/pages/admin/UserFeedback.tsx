import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FeedbackComment, FeedbackProps } from "../Feedback";
import { Container, Tab, Tabs } from "react-bootstrap";
import DateDropdown from "../../components/DateDropdown";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
// import TabsComponent from "../../components/Tabs";

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

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const fetchFood = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/feedback", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    const filteredJson = json.filter((feedback: FeedbackProps) => {
      const startDate = selectedDateInterval.startDate
        ? selectedDateInterval.startDate
        : "";
      const endDate = selectedDateInterval.endDate
        ? selectedDateInterval.endDate
        : "";
      return feedback.food.date >= startDate && feedback.food.date <= endDate;
    });

    if (response.ok) {
      setFeedback(filteredJson);
      console.log(filteredJson);
      if (filteredJson.length > 0) {
        setActiveKey(filteredJson[0].food.title);
        console.log("run");
      }
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

      {feedback.length > 0 ? (
        <div>
          <Tabs
            id="user-feedback-tab"
            className="mt-3"
            onSelect={(key: string | null) => setActiveKey(key || "")}
            style={{
              backgroundColor: "#265073",
              borderRadius: "5px",
            }}
          >
            {feedback.map((feedback: FeedbackProps) => (
              <Tab
                eventKey={feedback.food.title}
                title={feedback.food.title}
                key={feedback.food._id}
                style={{
                  maxHeight: "calc(100vh - 190px)",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  paddingTop: "10px",
                }}
              >
                {feedback.feedback.length > 0 ? (
                  feedback.feedback.map((fb: FeedbackComment) => (
                    <Container
                      className="mb-4"
                      style={{ display: "flex" }}
                      key={fb.user._id}
                    >
                      <Icon iconName="PersonCircle" size="30px" />
                      <div style={{ flex: 1, padding: "0 10px" }}>
                        <div>
                          <strong>{fb.user.email}</strong>
                        </div>
                        <div>
                          <Text>{fb.user.comment}</Text>
                        </div>
                      </div>
                    </Container>
                  ))
                ) : (
                  <Text>No feedback</Text>
                )}
              </Tab>
            ))}

          </Tabs>
        </div>
      ) : (
        <Text>No feedback</Text>
      )}
    </Container>
  );
};

export default UserFeedback;
