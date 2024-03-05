import { useContext } from "react";
import { Container } from "react-bootstrap";

const Loading = () => {
  const stylesheet = {};

  return (
    <Container
      id={"LoadingBackgroundCtn"}
      // styles={stylesheet["backgroundStyle"]}
    >
      <Container
        id={"LoadingCtn"}
        // styles={stylesheet["spinnerBackgroundStyle"]}
      >
        Loading
        {/* <Container styles={{ ...theme["DefSpinner"] }} id={"Loading"} /> */}
      </Container>
    </Container>
  );
};

export default Loading;
