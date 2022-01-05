import classNames from "classnames";
import { FC } from "react";


interface OnlineIndicatorProps {
  online?: boolean
  size: 'md' | 'lg'
}

const OnlineIndicator: FC<OnlineIndicatorProps> = ({ online, size }) => {
  const className = classNames('rounded-full absolute right-0 bottom-0 border-gray-800', {
    'bg-green-400': online,
    'bg-red-400': !online,
    'w-6 h-6 border-4 ': size === 'lg',
    'w-4 h-4 border-4': size === 'md',
  })
  return <div className={className} />

}

export default OnlineIndicator
