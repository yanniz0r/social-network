import classNames from "classnames"
import { FC } from "react"

interface ContainerProps {
  className?: string
}

const Container: FC<ContainerProps> = (props) => {
  const className = classNames("container mx-auto px-2 md:px-4 lg:px-6", props.className)
  return <div className={className}>
    {props.children}
  </div>
}

export default Container
