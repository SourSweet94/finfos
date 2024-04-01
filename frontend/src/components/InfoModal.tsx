import { Dispatch, SetStateAction } from "react";
import { Container, ModalProps } from "react-bootstrap";
import Modal from "./Modal";
import Icon from "./Icon";
import Button from "./Button";

interface InfoModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  headerTitle?: string;
  status?: "info" | "success" | "warning";
  buttonLbl1?: string;
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
  buttonLbl1,
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
        return icon("InfoCircle", "#a4c6de");
      case "success":
        return icon("CheckCircle", "green");
      case "warning":
        return icon("ExclamationCircle", "red");
    }
  };

  const renderFooter = (
    <>
      {buttonLbl1 && onClickBtn1 && (
        <Button
          onClick={onClickBtn1}
          style={{ backgroundColor: "#265073" }}
          className="mx-4"
        >
          {buttonLbl1}
        </Button>
      )}
      {buttonLbl2 && onClickBtn2 && (
        <Button
          onClick={onClickBtn2}
          style={{ backgroundColor: "white", color: "black" }}
          className="mx-4"
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
      footer={buttonLbl1 ? renderFooter : undefined}
      closeButton={closeButton}
      bsModalProps={bsModalProps}
    >
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderStatusIcon()}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {children}
          </div>
        </Container>
    </Modal>
  );
};

export default InfoModal;
