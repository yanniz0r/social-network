import Link from "next/link"
import { FC } from "react"
import Avatar from "./avatar"

interface NotificationRowProps {
  imageURL?: string
  linkURL: string
}

const NotificationRow: FC<NotificationRowProps> = (props) => {
  return <Link href={props.linkURL}>
    <a className="flex items-center hover:bg-blue-400 p-1 rounded-lg bg-opacity-75">
      <div>
        <div className="w-14 h-14 bg-green-300 rounded-full bg-center bg-contain" style={{ backgroundImage: props.imageURL ? `url(${props.imageURL})` : undefined }} />
      </div>
      <div className="ml-2">
        {props.children}
      </div>
    </a>
  </Link>
}

export default NotificationRow
