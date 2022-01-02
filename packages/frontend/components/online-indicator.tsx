import classNames from "classnames";
import { FC } from "react";


interface OnlineIndicatorProps {
  online?: boolean
}

const OnlineIndicator: FC<OnlineIndicatorProps> = ({ online }) => {
  const className = classNames({
    'w-6 h-6 rounded-full absolute right-0 bottom-0 border-4 border-gray-800': true,
    'bg-green-400': online,
    'bg-red-400': !online,
  })
  return <div className={className} />

}

export default OnlineIndicator
