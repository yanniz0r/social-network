import { FC } from "react"
import TextInput from "../form"

interface GeneralSettingsProps {
}

const GeneralSettings: FC<GeneralSettingsProps> = (props) => {
  return <>
    <div className="grid grid-cols-2 gap-5 wrap">
      <div>
        <TextInput label="Vorname" />
      </div>
      <div>
        <TextInput label="Nachname" />
      </div>
      <div>
        <TextInput label="E-Mail" />
      </div>
    </div>
  </>
}

export default GeneralSettings
