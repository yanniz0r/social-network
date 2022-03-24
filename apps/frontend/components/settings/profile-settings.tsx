import { useFormik } from "formik"
import { FC, useState } from "react"
import * as yup from "yup"
import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa"
import Button from "../button"
import TextInput from "../form"
import IconButton from "../icon-button"
import { useProfileSettingsUpdateProfileMutation } from "../../graphql/generated"
import Alert from "../alert"

interface ProfileSettingsForm {
  jobPosition: string
  jobCompany: string
  birthday: string
  hobbys: string[]
}

const ProfileSettings: FC = () => {
  const [updateProfileMutation, updateProfileMutationState] = useProfileSettingsUpdateProfileMutation()
  const [profileUpdatedSuccessfully, setProfileUpdatedSuccessfully] = useState(false)

  function addNewHobby() {
    setHobbys([
      ...form.values.hobbys,
      '',
    ])
  }

  function setHobbys(hobbys: string[]) {
    form.setValues({
      ...form.values,
      hobbys
    })
  }

  function removeHobby(index: number) {
    const newHobbys = [...form.values.hobbys]
    newHobbys.splice(index, 1)
    setHobbys(newHobbys)
  }

  function setHobby(index: number, text: string) {
    const newHobbys = [...form.values.hobbys]
    newHobbys[index] = text
    setHobbys(newHobbys)
  }

  function moveHobbyUp(index: number) {
    if (index === 0) return
    const otherIndex = index - 1
    exchangeHobbys(index, otherIndex)
  }

  function moveHobbyDown(index: number) {
    if (index === form.values.hobbys.length) return
    const otherIndex = index + 1
    exchangeHobbys(index, otherIndex)
    
  }

  function exchangeHobbys(indexA: number, indexB: number) {
    const hobbyA = form.values.hobbys[indexA]
    const hobbyB = form.values.hobbys[indexB]
    const newHobbys = [...form.values.hobbys]
    newHobbys[indexA] = hobbyB
    newHobbys[indexB] = hobbyA
    setHobbys(newHobbys)
  }

  const form = useFormik<ProfileSettingsForm>({
    validationSchema: yup.object({
      birthday: yup.date().required(),
      hobbys: yup.array(yup.string().required()),
      jobCompany: yup.string(),
      jobPosition: yup.string(),
    }),
    initialValues: {
      birthday: '',
      hobbys: [],
      jobCompany: '',
      jobPosition: '',
    },
    async onSubmit(data) {
      setProfileUpdatedSuccessfully(false)
      await updateProfileMutation({
        variables: {
          input: {
            birthday: data.birthday,
            jobCompany: data.jobCompany,
            jobPosition: data.jobPosition,
            hobbys: data.hobbys,
          }
        }
      })
      setProfileUpdatedSuccessfully(true)
    }
  })

  return <form className="space-y-5" onSubmit={form.handleSubmit}>
    {profileUpdatedSuccessfully &&
      <Alert>
        Your profile has been updated!
      </Alert>
    }
    <div>
      <h2 className="text-2xl dark:text-slate-100 mb-2">Arbeit</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <TextInput label="Position" value={form.values.jobPosition} onChange={form.handleChange} name="jobPosition" error={form.errors.jobPosition} />
        </div>
        <div>
          <TextInput label="Arbeitgeber" value={form.values.jobCompany} onChange={form.handleChange} name="jobCompany" error={form.errors.jobCompany}  />
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-2xl dark:text-slate-100 mb-2">Geburtstag</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <TextInput label="Geburtstag" type="date" value={form.values.birthday} onChange={form.handleChange} name="birthday" error={form.errors.birthday}  />
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-2xl mb-2 mt-5 dark:text-slate-100">Hobbies</h2>
      <div>
        {form.values.hobbys.map((hobby, index) => (
          <div className="flex items-end gap-2 mb-2" key={index}>
            <div className="flex-grow">
              <TextInput value={form.values.hobbys[index]} onChange={(e) => setHobby(index, e.currentTarget.value)} label={`Hobby ${index + 1}`} type="text" />
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
    </div>
    <Button variant="primary" type="submit">Speichern</Button>
  </form>
}

export default ProfileSettings
