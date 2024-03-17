import React, { Dispatch, SetStateAction } from "react";
import { Modal as BSModal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  headerTitle?: string;
  footer?: JSX.Element | JSX.Element[];
  closeButton?: boolean;
  bsModalProps?: {}

  style?: {
    // main?: {};
    // header?: {};
    // body?: {};
    // footer?: {};
  };
}

const Modal: React.FC<ModalProps> = ({
  show,
  setShow,
  children,
  className,
  headerTitle,
  footer,
  closeButton = true,
  bsModalProps,
  style,
}) => {
  const onHide = () => {
    setShow(false);
  };

  return (
    <BSModal
      show={show}
      onHide={onHide}
      className={className}
      centered
      style={style}
      backdrop="static"
      {...bsModalProps}
    >
      {headerTitle && (
        <BSModal.Header closeButton={closeButton} style={{ border: "none" }}>
          <BSModal.Title>{headerTitle}</BSModal.Title>
        </BSModal.Header>
      )}

      <BSModal.Body>{children}</BSModal.Body>

      {footer && (
        <BSModal.Footer
          style={{ border: "none", display: "flex", justifyContent: "center",  }}
        >
          {footer}
        </BSModal.Footer>
      )}
    </BSModal>
  );
};

export default Modal;
