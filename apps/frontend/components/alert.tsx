import { FC, ReactNode } from "react";
import Container from "./container";

interface AlertProps {
  icon?: ReactNode;
}

const Alert: FC<AlertProps> = (props) => {
  return (
    <div className="border-emerald-500 border-2 rounded-lg text-emerald-300 bg:text-emerald-900">
      <div className="flex flex-row items-center">
        <div className="mr-2">{props.icon}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Alert;
