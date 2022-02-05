import { FC, ReactNode } from "react"

interface AlertBarProps {
  icon?: ReactNode
}

const AlertBar: FC<AlertBarProps> = (props) => {
  return <div className="flex flex-row px-10 items-center py-4 bg-green-400 text-green-900">
    <div className="mr-2">
      {props.icon}
    </div>
    <div>
      {props.children}
    </div>
  </div>
}

export default AlertBar
