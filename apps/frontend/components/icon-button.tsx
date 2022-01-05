import classNames from "classnames";
import { FC } from "react";

interface IconButtonProps {
  color?: 'pink' | 'red' | 'green'
  onClick?(): void
  bubble?: number;
}

const IconButton: FC<IconButtonProps> = ({ children, color, bubble, onClick }) => {
  const containerClasses = classNames("h-10 w-10 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full relative", {
    "text-pink-500": !color || color === 'pink',
    "text-red-400": color === 'red',
    "text-green-400": color === 'green',
  })
  const bubbleClasses = classNames("absolute rounded-full -top-1 -right-1", {
    "bg-pink-500 text-pink-100 w-4 h-4 text-xs": !color || color === 'pink',
  })
  return <button className={containerClasses} onClick={e => {
    e.preventDefault()
    onClick?.()
  }}>
    {Boolean(bubble) &&
      <div className={bubbleClasses}>{bubble}</div>
    }
    {children}
  </button>
}

export default IconButton
