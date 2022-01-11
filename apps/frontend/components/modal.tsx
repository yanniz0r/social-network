import classNames from "classnames";
import { FC } from "react";
import { IoIosClose } from "react-icons/io";
import Card from "./card";

interface ModalProps {
  open: boolean;
  onClose?(): void;
}

const Modal: FC<ModalProps> = (props) => {
  return (
    <div
      className={classNames(
        "transition-all fixed top-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm py-14 px-14 z-10",
        {
          "opacity-0 pointer-events-none": !props.open,
        }
      )}
    >
      {props.onClose && (
        <button className="absolute top-4 right-4" onClick={props.onClose}>
          <IoIosClose className="text-4xl text-white" />
        </button>
      )}
      {props.children}
    </div>
  );
};

export default Modal;

interface ModalContentProps {}

export const ModalContent: FC<ModalContentProps> = (props) => {
  return <Card className="max-w-screen-lg bg-gray-800">{props.children}</Card>;
};
