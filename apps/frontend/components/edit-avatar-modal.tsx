import { FC, useState } from "react";
import { useEditAvatarMutation } from "../graphql/generated";
import Button from "./button";
import FileInput from "./file-input";
import Modal, { ModalContent } from "./modal";

interface EditAvatarModalProps {
  open: boolean;
  onClose(): void;
}

const EditAvatarModal: FC<EditAvatarModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File>();
  const [editAvatarMutation] = useEditAvatarMutation();

  async function uploadAvatar() {
    if (!file) return;
    await editAvatarMutation({
      variables: {
        avatarUpload: file,
      },
    });
    onClose();
  }

  console.log({ file });

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <div className="p-5">
          <h2 className="text-3xl text-slate-200 leading-none">
            Avatar bearbeiten
          </h2>
          <p className="mt-3 text-slate-400">
            Hier kannst du ein Bild von dir hochladen. Bitte beachte, dass es
            für alle Nutzer sichtbar sein wird :3
          </p>

          <div className="py-3">
            <FileInput onChange={setFile} />
          </div>

          <hr className="border-slate-900" />
          <div className="flex justify-end mt-3">
            <Button onClick={onClose} variant="secondary" className="mr-2">
              Abbrechen
            </Button>
            <Button onClick={uploadAvatar}>Upload</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditAvatarModal;
