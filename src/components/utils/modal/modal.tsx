import { Dispatch, SetStateAction } from 'react';
import { CSSTransition } from 'react-transition-group';
import useWindowSize from '../../../utils/hooks/use-window-size';

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
  const { widthStyle, heightStyle } = useWindowSize();

  const handleModalBackgroundClick = () => {
    setShowModal(false);
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={200}
      classNames="fade-in"
      unmountOnExit
    >
      <div
        style={{ width: widthStyle, height: heightStyle }}
        className="fixed top-0 left-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-70 p-1"
        onClick={handleModalBackgroundClick}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default Modal;
