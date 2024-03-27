import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FeedbackComment, FeedbackProps } from "../Feedback";
import { Container } from "react-bootstrap";
import DateDropdown from "../../components/DateDropdown";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Tabs from "../../components/Tabs";

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

  const [defaultActiveKey, setDefaultActiveKey] = useState<string>("");

  const fetchFood = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/feedback", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json)
    const filteredJson = json.filter((feedback: FeedbackProps) => {
      // check if the food has been deleted after giving feedback
      if(feedback === null){
        return null
      }
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
      if (filteredJson.length > 0) {
        setDefaultActiveKey(filteredJson[0].food.title);
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
        <Tabs
          tabs={feedback.map((feedbackItem: FeedbackProps) => ({
            _id: feedbackItem.food._id,
            title: feedbackItem.food.title,
            content: (
              <>
                {feedbackItem.feedback.length > 0 ? (
                  feedbackItem.feedback.map((fb: FeedbackComment) => (
                    <Container
                      className="mb-4"
                      style={{ display: "flex", paddingTop: '10px' }}
                      key={fb.user._id}
                    >
                      <Icon iconName="PersonCircle" size="30px" />
                      <div style={{ flex: 1, padding: "0 10px" }}>
                        <div>
                          <Text as="strong">{fb.user.email}</Text>
                        </div>
                        <div>
                          <Text>{fb.user.comment}</Text>
                        </div>
                      </div>
                    </Container>
                  ))
                ) : (
                  <Container style={{display: 'flex', justifyContent: 'center'}}>
                    <Text style={{}}>No feedback</Text>
                  </Container>
                )}
              </>
            ),
          }))}
          defaultActiveKey={defaultActiveKey}
        />
      ) : (
        <Text>No food</Text>
      )}
    </Container>
  );
};

export default UserFeedback;
