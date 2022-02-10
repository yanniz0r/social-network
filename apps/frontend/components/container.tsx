import { FC } from "react"

interface ContainerProps {
}

const Container: FC<ContainerProps> = (props) => {
  return <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5">
    {props.children}
  </div>
}

export default Container
