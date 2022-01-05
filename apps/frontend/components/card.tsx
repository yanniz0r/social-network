import { FC } from "react";

interface CardProps {
  className?: string
}

const Card: FC<CardProps> = (props) => {
  return <div className={`bg-gray-800 rounded-lg ${props.className}`}>
    {props.children}
  </div>
}

export default Card
