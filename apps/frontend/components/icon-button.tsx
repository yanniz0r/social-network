import classNames from "classnames";
import { FC } from "react";

interface IconButtonProps {
  onClick?(): void;
  bubble?: number;
  color?: 'primary' | 'error' | 'success'
}

const IconButton: FC<IconButtonProps> = ({
  children,
  bubble,
  onClick,
  color
}) => {
  if (!color) color = 'primary'
  const containerClassName = classNames("h-10 w-10 flex items-center justify-center dark:bg-slate-900 bg-slate-200 bg-opacity-50 rounded-full relative transition-all transform hover:scale-105", {
    'text-blue-500 dark:text-blue-400': color === 'primary',
    'text-rose-400': color === 'error',
    'text-emerald-400': color === 'success',
  })
  const bubbleClassName = classNames("absolute rounded-full -top-1 -right-1", {
  });
  return (
    <button
      className={containerClassName}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {Boolean(bubble) && <div className={bubbleClassName}>{bubble}</div>}
      {children}
    </button>
  );
};

export default IconButton;
