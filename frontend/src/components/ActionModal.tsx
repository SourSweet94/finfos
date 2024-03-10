import { Dispatch, SetStateAction, useContext } from "react";
import Modal from "./Modal";
import FoodForm from "./FoodForm";
// import { FoodProps } from "./FoodDetails";
import { FoodProps } from "../context/FoodContext";
import { ScreenContext } from "../context/ScreenContext";
import { RecordProps } from "./legacy/LegacyRecord";
import RecordForm from "./RecordForm";

interface ActionModalProps {
  food?: FoodProps;
  record?: RecordProps;

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

const ActionModal = ({ food, record, show, setShow }: ActionModalProps) => {
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
      styles={{ main: styleSheet.main }}
    >
      <>
        {screenType === "Action" && (
          <FoodForm
            foodDetails={food}
            setModalShow={handleCloseModal}
          />
        )}
        {screenType === 'Browse' && (
          <RecordForm record={record} setModalShow={handleCloseModal} />
        )}
      </>
    </Modal>
  );
};

export default ActionModal;
