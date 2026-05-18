import React, { ChangeEvent } from 'react'

export interface Props {
  label?: string;
  error?: string;
  styles?: string;
  setData: (value: File) => unknown;
}

export default function FileSelect({ label, error, setData }: Props) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && e.target.files.length > 0) {
      setData(e.target.files[0])
    }
  }

  return (
    <>
      <label className="standard-label">
        {label}
      </label>
      <input type="file" name="name"
        onChange={onFile}
        className="standard-input"
      />
      {error && <div className="error-text">{error}</div>}
    </>
  )
}
