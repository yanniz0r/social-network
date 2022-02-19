import { FC } from "react"
import Navigation from "../components/navigation"

interface SignedInLayoutProps {
}

const SignedInLayout: FC<SignedInLayoutProps> = (props) => {
  return <div className="flex">
    <Navigation />
    <div className="flex-grow">
      {props.children}
    </div>
  </div>
}

export default SignedInLayout
