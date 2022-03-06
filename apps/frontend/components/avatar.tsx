import classNames from "classnames";
import { FC } from "react";

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
      "outline outline-offset-2 outline-2 outline-emerald-400": online === true,
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
    </div>
  );
};

export default Avatar;
