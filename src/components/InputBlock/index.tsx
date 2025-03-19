import { Button, Input, Text } from '../Basic'
import { RowButtonInput, TextError } from './styles'

interface TInputBlockProps {
  buttonTitle: string
  error: string
  placeholder: string
  resultPlaceholder: string
  result: string
  value: string
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputBlock = ({
  buttonTitle,
  error,
  placeholder,
  resultPlaceholder,
  result,
  value,
  onClick,
  onChange
}: TInputBlockProps) => {
  return (
    <RowButtonInput>
      <Button buttonType="primary" onClick={onClick}>
        {buttonTitle}
      </Button>
      <Input value={value} placeholder={placeholder} onChange={onChange} />
      {!!error && <TextError>{`Error: ${error}`}</TextError>}
      {!!result && <Text>{`${resultPlaceholder}: ${result}`}</Text>}
    </RowButtonInput>
  )
}
