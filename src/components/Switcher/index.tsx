import React from 'react'
import { ButtonContainer, ColLetter, Container, DropdownContent, DropdownItem, Row, Text } from './styles'

export type TSwitcherItem = {
  address: string
  name: string
  domainSeparator: string
}

export type TChainSwitcherProps = {
  data: TSwitcherItem[]
  activeItem: TSwitcherItem
  onChange: (item: TSwitcherItem) => void
}

export const Switcher: React.FC<TChainSwitcherProps> = ({ data, activeItem, onChange }) => {
  return (
    <Container>
      <ButtonContainer>
        <Row>
          <ColLetter>{activeItem.name.charAt(0)}</ColLetter>
          <Text>{activeItem.name}</Text>
        </Row>
      </ButtonContainer>
      <DropdownContent>
        {data.map((item) => (
          <DropdownItem key={item.address} onClick={() => onChange(item)}>
            <Text>{item.name}</Text>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Container>
  )
}
