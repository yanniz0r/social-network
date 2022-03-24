

import { FC, HTMLProps } from "react"

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
}

const TextInput: FC<TextInputProps> = ({ label, error, ...inputProps }) => {
  return <label className="flex flex-col gap-1">
    <span className="font-semibold text-sm text-slate-500 dark:text-slate-300">{label}</span>
    <input {...inputProps} className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700 dark:text-slate-100" />
    {error &&
      <p className="text-red-400 text-sm">
        {error}
      </p>
    }
  </label>
}

export default TextInput
