import { Button, Input, Text } from '../Basic'
import { RowButtonInput, TextError } from './styles'

interface TDoubleInputBlockProps {
  buttonTitle: string
  error: string
  placeholder1: string
  placeholder2: string
  resultPlaceholder: string
  result: string
  value1: string
  value2: string
  onClick: () => void
  onChange1: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange2: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DoubleInputBlock = ({
  buttonTitle,
  error,
  placeholder1,
  placeholder2,
  resultPlaceholder,
  result,
  value1,
  value2,
  onClick,
  onChange1,
  onChange2
}: TDoubleInputBlockProps) => {
  return (
    <RowButtonInput>
      <Button buttonType="primary" onClick={onClick}>
        {buttonTitle}
      </Button>
      <Input value={value1} placeholder={placeholder1} onChange={onChange1} />
      <Input value={value2} placeholder={placeholder2} onChange={onChange2} />
      {!!error && <TextError>{`Error: ${error}`}</TextError>}
      {!!result && <Text>{`${resultPlaceholder}: ${result}`}</Text>}
    </RowButtonInput>
  )
}
