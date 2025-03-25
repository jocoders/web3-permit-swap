import React from 'react'

import { Select } from './styles'

interface TPickerProps {
  value: string
  onChange: (value: string) => void
}

export const Picker: React.FC<TPickerProps> = ({ value, onChange }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {days.map((day) => (
        <option key={day} value={day}>
          {day} {day === 1 ? 'day' : 'days'}
        </option>
      ))}
    </Select>
  )
}
