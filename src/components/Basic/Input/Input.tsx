import React, { CSSProperties } from 'react'
import { InputComponent } from './styles'

export type TInputProps = {
  value: string
  style?: CSSProperties
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<TInputProps> = ({ value, onChange, style, placeholder }) => {
  return <InputComponent type="text" style={style} value={value} onChange={onChange} placeholder={placeholder} />
}
