import classNames from "classnames"
import { FC } from "react"
import Navigation, { NavigationSpacer } from "../components/navigation"

interface SignedInLayoutProps {
  navigationSpace?: boolean
  contentSpace?: boolean
}

const SignedInLayout: FC<SignedInLayoutProps> = (props) => {
  const contentClassName = classNames({
    'mt-5': props.contentSpace
  })
  return <div>
    <Navigation />
    {props.navigationSpace && <NavigationSpacer />}
    <div className={contentClassName}>
      {props.children}
    </div>
  </div>
}

export default SignedInLayout
