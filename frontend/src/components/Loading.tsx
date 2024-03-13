import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  const stylesheet = {
    // width: "200px",
    // background: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <Container style={stylesheet}>
      <Spinner animation="border" />
    </Container>
  );
};

export default Loading;
