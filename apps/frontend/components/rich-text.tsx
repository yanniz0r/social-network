import { FC } from "react";

interface RichTextProps {
  text: string;
}

const emojiMap: { find: string; replace: string }[] = [
  {
    find: "^^",
    replace: "😁",
  },
  {
    find: ":D",
    replace: "😀",
  },
  {
    find: "<3",
    replace: "❤️",
  },
  {
    find: ":o",
    replace: "😮",
  },
];

function emojifi(text: string) {
  let modifiedText = text;
  emojiMap.forEach(({ find, replace }) => {
    modifiedText = modifiedText.replaceAll(find, replace);
  });
  return modifiedText;
}

const RichText: FC<RichTextProps> = ({ text }) => {
  return <>{emojifi(text)}</>;
};

export default RichText;
