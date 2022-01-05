import classNames from "classnames";
import { FC } from "react";
import OnlineIndicator from "./online-indicator";

interface AvatarProps {
  name: string
  online?: boolean
  size: 'md'
}

const Avatar: FC<AvatarProps> = ({ name, size, online }) => {
  const charCode = name.charCodeAt(0)
  const totalColors = 3
  const colorIndex = charCode % totalColors

  const containerClassNames = classNames("flex items-center justify-center text-white rounded-full font-bold relative", {
    "w-10 h-10": size === 'md',
    "bg-green-500": colorIndex === 0,
    "bg-red-500": colorIndex === 1,
    "bg-blue-500": colorIndex === 2,
  })

  return <div className={containerClassNames}>
    {name[0]}
    <OnlineIndicator size="md" online={online} />
  </div>
}

export default Avatar
