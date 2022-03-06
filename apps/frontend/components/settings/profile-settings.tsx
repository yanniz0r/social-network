import { FC, useState } from "react"
import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa"
import Button from "../button"
import TextInput from "../form"
import IconButton from "../icon-button"

interface ProfileSettingsProps {
}

const ProfileSettings: FC<ProfileSettingsProps> = (props) => {
  const [hobbys, setHobbys] = useState<string[]>([])

  function addNewHobby() {
    setHobbys([...hobbys, ''])
  }

  function removeHobby(index: number) {
    const newHobbys = [...hobbys]
    newHobbys.splice(index, 1)
    setHobbys(newHobbys)
  }

  function setHobby(index: number, text: string) {
    const newHobbys = [...hobbys]
    newHobbys[index] = text
    setHobbys(newHobbys)
  }

  function moveHobbyUp(index: number) {
    if (index === 0) return
    const otherIndex = index - 1
    exchangeHobbys(index, otherIndex)
  }

  function moveHobbyDown(index: number) {
    if (index === hobbys.length) return
    const otherIndex = index + 1
    exchangeHobbys(index, otherIndex)
    
  }

  function exchangeHobbys(indexA: number, indexB: number) {
    const hobbyA = hobbys[indexA]
    const hobbyB = hobbys[indexB]
    const newHobbys = [...hobbys]
    newHobbys[indexA] = hobbyB
    newHobbys[indexB] = hobbyA
    setHobbys(newHobbys)
  }

  return <>
    <h2 className="text-2xl mb-2">Arbeit</h2>
    <div className="grid grid-cols-2 gap-5">
      <div>
        <TextInput label="Position" />
      </div>
      <div>
        <TextInput label="Arbeitgeber" />
      </div>
    </div>
    <h2 className="text-2xl mb-2 mt-5">Geburtstag</h2>
    <div className="grid grid-cols-2 gap-5">
      <div>
        <TextInput label="Geburtstag" type="date" />
      </div>
    </div>
    <h2 className="text-2xl mb-2 mt-5">Hobbies</h2>
    <div>
      {hobbys.map((hobby, index) => (
        <div className="flex items-end gap-2 mb-2" key={index}>
          <div className="flex-grow">
            <TextInput value={hobbys[index]} onChange={(e) => setHobby(index, e.currentTarget.value)} label={`Hobby ${index + 1}`} type="text" />
          </div>
          <IconButton color="error" onClick={() => removeHobby(index)}>
            <FaMinus />
          </IconButton>
          <IconButton color="primary" onClick={() => moveHobbyUp(index)}>
            <FaArrowUp />
          </IconButton>
          <IconButton color="primary" onClick={() => moveHobbyDown(index)}>
            <FaArrowDown />
          </IconButton>
        </div>
      ))}
      <Button variant="secondary" onClick={addNewHobby}>Hobby hinzufügen</Button>
    </div>
  </>
}

export default ProfileSettings
