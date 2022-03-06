

import { FC, HTMLProps } from "react"

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  label: string
}

const TextInput: FC<TextInputProps> = ({ label, ...inputProps }) => {
  return <label className="flex flex-col gap-1">
    <span className="font-semibold text-sm text-slate-500">{label}</span>
    <input {...inputProps} className="bg-white p-2 rounded-lg border border-slate-100" />
  </label>
}

export default TextInput
