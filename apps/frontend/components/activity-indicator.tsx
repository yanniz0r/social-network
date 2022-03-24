import { FC } from "react"
import { FaSpinner } from "react-icons/fa"

interface ActivityIndicatorProps {
}

const ActivityIndicator: FC<ActivityIndicatorProps> = (props) => {
  return <div className="flex items-center justify-center dark:text-white">
    <FaSpinner className="animate-spin" />
  </div>
}

export default ActivityIndicator
