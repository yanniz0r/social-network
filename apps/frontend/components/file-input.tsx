import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

interface FileInputProps {
  onChange(file: File): void;
}

const FileInput: FC<FileInputProps> = (props) => {
  const [preview, setPreview] = useState<string>();
  const dropzone = useDropzone({
    multiple: false,
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];
      if (file) {
        props.onChange(file);
      }
    },
  });

  useEffect(() => {
    const file = dropzone.acceptedFiles[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (progressEvent) => {
        const result = progressEvent.target?.result;
        if (result) {
          setPreview(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }, [dropzone.acceptedFiles]);

  return (
    <label
      className={classNames(
        "h-52 flex flex-col items-center justify-center border-4 rounded-lg border-gray-600 cursor-pointer bg-contain bg-center",
        {
          "border-green-200": dropzone.isDragActive,
        }
      )}
      {...dropzone.getRootProps()}
    >
      {preview ? (
        <div
          className="w-2/5 h-2/5 bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        />
      ) : (
        <FaImage className="text-6xl text-gray-600" />
      )}
      <p className="text-lg text-gray-400 text-center px-5">
        {dropzone.draggedFiles.length > 0 && "Loslassen zum hochladen"}
        {dropzone.acceptedFiles[0] && dropzone.acceptedFiles[0].name}
      </p>
      <input type="file" className="hidden" {...dropzone.getInputProps()} />
    </label>
  );
};

export default FileInput;
