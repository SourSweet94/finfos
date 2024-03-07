import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  const stylesheet = {
    background: "red",
    width: "200px",
  };

  return <Spinner animation="border" />;
};

export default Loading;
