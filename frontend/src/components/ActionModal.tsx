import { Dispatch, SetStateAction, useContext } from "react";
import Modal from "./Modal";
import WorkoutForm from "./WorkoutForm";
import { WorkoutProps } from "./WorkoutDetails";
import { ScreenContext } from "../context/ScreenContext";
import { RecordProps } from "./Record";
import RecordForm from "./RecordForm";

interface ActionModalProps {
  workout?: WorkoutProps;
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

const ActionModal = ({ workout, record, show, setShow }: ActionModalProps) => {
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
          <WorkoutForm
            workoutDetails={workout}
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
