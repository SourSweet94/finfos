import { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { Col, Container, ModalProps, Row } from "react-bootstrap";
import Icon from "./Icon";
import Button from "./Button";

interface InfoModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  headerTitle?: string;
  status?: "info" | "success" | "fail" | "warning";
  buttonLbl?: string;
  onClickBtn1?: () => void;
  buttonLbl2?: string;
  onClickBtn2?: () => void;
  closeButton?: boolean;
  children?: JSX.Element | JSX.Element[];
  bsModalProps?: ModalProps;
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
  closeButton,
  children,
  bsModalProps,
}: InfoModalProps) => {
  const renderStatusIcon = () => {
    const icon = (iconName: any, iconColor: string) => {
      return <Icon iconName={iconName} color={iconColor} size="50px" />;
    };

    switch (status) {
      case "info":
        return icon("InfoCircleFill", "#a4c6de");
      case "success":
        return icon("CheckCircleFill", "green");
      case "fail":
        return icon("ExclamationCircle", "red");
      case "warning":
        return icon("Icon0CircleFill", "red");
    }
  };

  const renderFooter = (
    <>
      {buttonLbl && onClickBtn1 && (
        <Button onClick={onClickBtn1} style={{ backgroundColor: "#265073" }}>
          {buttonLbl}
        </Button>
      )}
      {buttonLbl2 && onClickBtn2 && (
        <Button
          onClick={onClickBtn2}
          style={{ backgroundColor: "white", color: "black" }}
        >
          {buttonLbl2}
        </Button>
      )}
    </>
  );

  return (
    <Modal
      show={show}
      setShow={setShow}
      headerTitle={headerTitle}
      footer={renderFooter}
      closeButton={closeButton}
      bsModalProps={bsModalProps}
    >
      <>
        <Container>
          <Row style={{}}>
            <Col
              lg={3}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {renderStatusIcon()}
            </Col>
            <Col
              lg={9}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {children}
            </Col>
          </Row>
        </Container>
      </>
    </Modal>
  );
};

export default InfoModal;
