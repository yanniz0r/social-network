import { FC, ReactNode } from "react";
import Container from "./container";

interface AlertBarProps {
  icon?: ReactNode;
}

const AlertBar: FC<AlertBarProps> = (props) => {
  return (
    <div className="dark:bg-green-400 bg-emerald-300 dark:text-green-900 bg:text-emerald-900">
      <Container>
        <div className="flex flex-row items-center">
          <div className="mr-2">{props.icon}</div>
          <div>{props.children}</div>
        </div>
      </Container>
    </div>
  );
};

export default AlertBar;
