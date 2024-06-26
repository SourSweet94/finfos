import { Dispatch, SetStateAction, useContext } from "react";
import { ScreenContext } from "../context/ScreenContext";
import Modal from "./Modal";
import FoodForm from "./FoodForm";
import RecordForm from "./RecordForm";

interface ActionModalProps {
  data?: any;

  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  onClick?: () => void;
  onCloseClick?: () => void;
  closable?: boolean;
  className?: string;
  buttonLabel2?: string;
  onClick2?: () => void;
}

const ActionModal = ({
  data,
  show,
  setShow,
}: ActionModalProps) => {
  const { screenType, action, setAction } = useContext(ScreenContext);
  const handleCloseModal = () => {
    setShow(false);
    setAction("");
  };
  const header = action === "N" ? "Add" : "Edit";

  const styleSheet = {
    main: {
      // color: "blue",
      // width: '50%',
    },
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      headerTitle={header}
      style={{ main: styleSheet.main }}
    >
      <>
        {screenType === "Action" && (
          <FoodForm
            foodDetails={data}
            setModalShow={handleCloseModal}
          />
        )}
        {screenType === "Browse" && (
          <RecordForm record={data} setModalShow={handleCloseModal} />
        )}
      </>
    </Modal>
  );
};

export default ActionModal;
