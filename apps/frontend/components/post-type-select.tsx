import classNames from "classnames";
import { FC, ReactNode } from "react";
import { FaImage, FaParagraph } from "react-icons/fa";

type PostType = "image" | "text";

interface PostTypeOption {
  label: string;
  value: PostType;
  icon: ReactNode;
}

const types: PostTypeOption[] = [
  {
    value: "text",
    label: "Text",
    icon: <FaParagraph />,
  },
  {
    value: "image",
    label: "Foto",
    icon: <FaImage />,
  },
];

interface PostTypeSelectProps {
  value: PostType;
  onChange(value: PostType): void;
}

const PostTypeSelect: FC<PostTypeSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex">
      {types.map((type) => (
        <button
          className={classNames(
            "px-4 py-2 text-green-300 rounded-full mr-2 flex items-center",
            {
              "bg-green-400 bg-opacity-10 text-green-400": value === type.value,
            }
          )}
          onClick={() => onChange(type.value)}
        >
          <div className="mr-2">{type.icon}</div>
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default PostTypeSelect;
