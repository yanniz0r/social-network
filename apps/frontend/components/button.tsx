import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick?(): void;
  className?: string;
  iconStart?: ReactNode;
  variant?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className: parentClassName,
  iconStart
}) => {
  const className = classNames(
    "inline-flex flex-row items-center px-4 py-2 rounded-lg bg-opacity-20 transition-all transform hover:scale-105",
    {
      "bg-blue-500 text-blue-400": variant === "primary",
      "bg-gray-700 bg-opacity-100 text-gray-300": variant === "secondary",
    },
    parentClassName
  );

  return (
    <button className={className} onClick={onClick}>
      {iconStart &&
        <div className="mr-2">
          {iconStart}
        </div>
      }
      {children}
    </button>
  );
};

export default Button;
