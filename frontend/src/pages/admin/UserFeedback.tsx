import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../context/ScreenContext";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FeedbackComment, FeedbackProps } from "../Feedback";

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
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchFood();
    }
  }, []);

  return (
    <div>
      {feedback.map((feedback: FeedbackProps) => (
        <>
          <h3>{feedback.food_id}</h3>
          <p>
            {feedback.feedback.map((fb: FeedbackComment) => (
              <>
                <strong>{fb.user_id}</strong>
                <textarea>{fb.comment}</textarea>
              </>
            ))}
          </p>
        </>
      ))}
    </div>
  );
};

export default UserFeedback;
