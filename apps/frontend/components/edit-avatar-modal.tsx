import { FC, useState } from "react"
import { useEditAvatarMutation } from "../graphql/generated"
import Modal, { ModalContent } from "./modal"

interface EditAvatarModalProps {
  open: boolean
  onClose(): void
}

const EditAvatarModal: FC<EditAvatarModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File>()
  const [editAvatarMutation] = useEditAvatarMutation()

  async function uploadAvatar() {
    if (!file) return
    await editAvatarMutation({
      variables: {
        avatarUpload: file
      }
    })
    onClose()
  }

  return <Modal open={open} onClose={onClose}>
    <ModalContent>
      <div className="p-5">
        <h2 className="text-3xl text-gray-200 leading-none">Avatar bearbeiten</h2>
        <p className="mt-3 text-gray-400">Hier kannst du ein Bild von dir hochladen. Bitte beachte, dass es für alle Nutzer sichtbar sein wird :3</p>

        <input type="file" className="mt-3" onChange={(event) => {
          const firstFile = event.target.files?.[0]
          if (firstFile) {
            setFile(firstFile)
          }
        }} />
        <div>
          <button className="block" onClick={uploadAvatar}>Upload</button>
        </div>
      </div>
    </ModalContent>
  </Modal>
}

export default EditAvatarModal
