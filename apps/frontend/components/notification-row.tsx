import { formatRelative } from "date-fns";
import Link from "next/link";
import { FC } from "react";

interface NotificationRowProps {
  imageURL?: string;
  linkURL: string;
  date?: Date;
  onClick?(): void;
}

const NotificationRow: FC<NotificationRowProps> = (props) => {
  return (
    <Link href={props.linkURL}>
      <a
        className="flex items-center hover:bg-slate-200 dark:hover:bg-slate-700 bg-opacity-50 p-1 rounded-lg"
        onClick={props.onClick}
      >
        <div>
          <div
            className="w-14 h-14 bg-slate-400 rounded-full bg-center bg-contain"
            style={{
              backgroundImage: props.imageURL
                ? `url(${props.imageURL})`
                : undefined,
            }}
          />
        </div>
        <div className="ml-2">
          <div className="text-slate-800 dark:text-slate-200">{props.children}</div>
          {props.date && (
            <div>
              <small className="dark:text-blue-300 text-blue-600">
                {formatRelative(props.date, new Date())}
              </small>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default NotificationRow;
