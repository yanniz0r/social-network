import { FC } from "react"
import TextInput from "../form"

interface SecuritySettingsProps {
}

const SecuritySettings: FC<SecuritySettingsProps> = (props) => {
  return <>
    <div className="grid grid-cols-2 gap-5">
      <div>
        <TextInput label="Todo" />
      </div>  
    </div>
  </>
}

export default SecuritySettings
