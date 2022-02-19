import { formatRelative } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import Avatar from "./avatar";
import Card from "./card";

interface NotificationRowProps {
  imageURL?: string;
  linkURL: string;
  date?: Date;
  onClick?(): void;
}

const NotificationRow: FC<NotificationRowProps> = (props) => {
  return (
    <Link href={props.linkURL}>
      <a>
        <Card className="p-3 flex flex-row gap-2">
          <div>
            <Avatar online name="N" size="md" imageURL={props.imageURL} />
          </div>
          <div>
            <div className="leading-tight">
              {props.children}
            </div>
            {props.date &&
              <div className="text-xs text-slate-600">
                {formatRelative(props.date, new Date())}
              </div>
            }
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default NotificationRow;
