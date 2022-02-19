import classNames from "classnames"
import { FC } from "react"

interface ContainerProps {
  x?: boolean
  y?: boolean
}

const Container: FC<ContainerProps> = (props) => {
  const className = classNames({
    "px-4 sm:px-6 md:px-8 lg:px-10": props.x !== false,
    "py-2 sm:py-3 md:py-4 lg:py-5": props.y !== false,
  })
  return <div className={className}>
    {props.children}
  </div>
}

export default Container
