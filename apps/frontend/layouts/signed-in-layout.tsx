import { FC } from "react"
import Navigation from "../components/navigation"

interface SignedInLayoutProps {
}

const SignedInLayout: FC<SignedInLayoutProps> = (props) => {
  return <div>
    <Navigation />
    <div>
      {props.children}
    </div>
  </div>
}

export default SignedInLayout
