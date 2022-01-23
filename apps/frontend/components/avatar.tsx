import classNames from "classnames";
import { FC } from "react";
import OnlineIndicator from "./online-indicator";

interface AvatarProps {
  name: string;
  imageURL?: string;
  online?: boolean;
  size: "md" | "lg";
}

const Avatar: FC<AvatarProps> = ({ name, size, online, imageURL }) => {
  const charCode = name.charCodeAt(0);
  const totalColors = 3;
  const colorIndex = charCode % totalColors;

  const containerClassNames = classNames(
    "flex items-center justify-center text-white rounded-full font-bold relative bg-cover",
    {
      "w-10 h-10": size === "md",
      "w-16 h-16": size === "lg",
      "bg-green-500": colorIndex === 0,
      "bg-red-500": colorIndex === 1,
      "bg-blue-500": colorIndex === 2,
    }
  );

  return (
    <div
      className={containerClassNames}
      style={{
        backgroundImage: imageURL ? `url(${imageURL})` : undefined,
      }}
    >
      {!imageURL && name[0]}
      {typeof online === 'boolean' &&
        <OnlineIndicator size={size} online={online} />
      }
    </div>
  );
};

export default Avatar;
