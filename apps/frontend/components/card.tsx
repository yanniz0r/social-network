import { FC } from "react";

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 dark:border shadow-sm border-slate-300 dark:border-slate-700 rounded-lg ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
