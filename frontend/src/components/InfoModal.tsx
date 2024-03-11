import { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { Col, Container, Row } from "react-bootstrap";
import Icon from "./Icon";
import Button from "./Button";

interface InfoModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  headerTitle?: string;
  status?: "info" | "success" | "fail" | "warning";
  buttonLbl: string;
  onClickBtn1: () => void;
  buttonLbl2?: string;
  onClickBtn2?: () => void;
  children?: JSX.Element | JSX.Element[];
}

const InfoModal = ({
  show,
  setShow,
  headerTitle,
  status,
  buttonLbl,
  onClickBtn1,
  buttonLbl2,
  onClickBtn2,
  children,
}: InfoModalProps) => {
  const renderStatusIcon = () => {
    const icon = (iconName: any, iconColor: string) => {
      return <Icon iconName={iconName} color={iconColor} />;
    };

    switch (status) {
      case "info":
        return icon("Icon0CircleFill", "blue");
      case "success":
        return icon("Icon0CircleFill", "green");
      case "fail":
        return icon("ExclamationCircle", "red");
      case "warning":
        return icon("Icon0CircleFill", "red");
    }
  };

  const renderFooter = (
    <>
      <Button onClick={onClickBtn1}>{buttonLbl}</Button>
      {buttonLbl2 && onClickBtn2 && (
        <Button onClick={onClickBtn2}>{buttonLbl2}</Button>
      )}
    </>
  );

  return (
    <Modal
      show={show}
      setShow={setShow}
      headerTitle={headerTitle}
      footer={renderFooter}
    >
      <>
        <Container>
          <Row>
            <Col>{renderStatusIcon()}</Col>
            <Col>{children}</Col>
          </Row>
        </Container>
      </>
    </Modal>
  );
};

export default InfoModal;
