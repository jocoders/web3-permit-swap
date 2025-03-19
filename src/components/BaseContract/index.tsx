import React from 'react'
import sepoliaLogo from '../../../public/sepolia.png'
import { BASIC_CONTRACT_ADDRESS } from '../../const/contract'
import { Button, Header, Image, Input, Row, Spacer, Text } from '../Basic'
import { useContractBaseController as useController } from './controller'
import { Container, RowButtonInput, TextError } from './styles'

export const BaseContract: React.FC = () => {
  const { contractOwner, balanceContract, withdrawEthFromContract, inEth, onChangeInEth, inEthError } = useController()

  return (
    <Container>
      <Row>
        <Image source={sepoliaLogo} alt="Sepolia Logo" />
        <Header text="Sepolia Contract" />
      </Row>
      <Spacer height={10} />
      {!!contractOwner && typeof contractOwner === 'string' && (
        <Text>{`Contract owner: ${contractOwner?.substring(0, 6)}...${contractOwner?.substring(38)}`}</Text>
      )}
      <Spacer height={4} />
      <Text>{`Contract address: ${BASIC_CONTRACT_ADDRESS}`}</Text>
      <Spacer height={4} />
      <Text>{`Contract balance: ${balanceContract || 0}`}</Text>
      <Spacer height={10} />
      <RowButtonInput>
        <Button buttonType="primary" onClick={withdrawEthFromContract}>
          {'Withdraw ETH'}
        </Button>
        <Input value={inEth} onChange={onChangeInEth} />
        {!!inEthError && <TextError>{`Error: ${inEthError}`}</TextError>}
      </RowButtonInput>
    </Container>
  )
}
