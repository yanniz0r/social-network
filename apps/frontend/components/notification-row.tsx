import { formatRelative } from "date-fns"
import Link from "next/link"
import { FC } from "react"
import Avatar from "./avatar"

interface NotificationRowProps {
  imageURL?: string
  linkURL: string
  date?: Date
}

const NotificationRow: FC<NotificationRowProps> = (props) => {
  return <Link href={props.linkURL}>
    <a className="flex items-center hover:bg-gray-300 p-1 rounded-lg bg-opacity-50">
      <div>
        <div className="w-14 h-14 bg-green-300 rounded-full bg-center bg-contain" style={{ backgroundImage: props.imageURL ? `url(${props.imageURL})` : undefined }} />
      </div>
      <div className="ml-2">
        <div>
          {props.children}
        </div>
        {props.date &&
          <div>
            <small className="text-blue-700">{formatRelative(props.date, new Date())}</small>
          </div>
        }
      </div>
    </a>
  </Link>
}

export default NotificationRow
