import React from 'react'
import metamaskLogo from '../../../public/metamask-fox.png'
import { Button, Button as ButtonBase, Col, Header, Image, Input, Row, Spacer, Text } from '../Basic'
import { ChainSwitcher } from '../ChainSwitcher/ChainSwitcher'
import { useMetamskController as useController } from './controller'
import { ButtonDisconnect, Container, RowBalance, RowButtonInput, TextBalance, TextError } from './styles'

export const Metamask: React.FC = () => {
  const {
    address,
    activeChainId,
    availableChains,
    balanceWallet,
    outEth,
    connectWallet,
    disconnectWallet,
    sendEthToContract,
    onChangeChain,
    onChangeOutEth,
    outEthError,
    connectors,
    switchAccount
  } = useController()

  return (
    <Container>
      <Row>
        <Image source={metamaskLogo} alt="Metamask Logo" />
        <Header text="MetaMask" />
      </Row>
      {!address && (
        <Col>
          <Text>{'Welcome to the Web3 Universe'}</Text>
          <Text>{'Change the world with Web3'}</Text>
          <Text>
            {'Connect your wallet to explore decentralized possibilities and manage your digital assets with ease.'}
          </Text>
          <Spacer height={10} />
        </Col>
      )}
      <RowBalance>
        <ButtonBase buttonType="primary" onClick={connectWallet} disabled={!!address}>
          {address ? `Connected: ${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
        </ButtonBase>
        {!!address && <TextBalance>{`Balance: ${balanceWallet ?? 0}`}</TextBalance>}
      </RowBalance>
      {!!address && (
        <ChainSwitcher availableChains={availableChains} activeChainId={activeChainId} onChangeChain={onChangeChain} />
      )}
      <Spacer height={10} />
      {!!address && (
        <RowButtonInput>
          <Button buttonType="primary" onClick={sendEthToContract}>
            {'Sent ETH'}
          </Button>
          <Input value={outEth} onChange={onChangeOutEth} />
          {!!outEthError && <TextError>{`Error: ${outEthError}`}</TextError>}
        </RowButtonInput>
      )}
      <Spacer height={10} />
      {!!address && (
        <ButtonDisconnect buttonType="primary" onClick={disconnectWallet}>
          {'Disconnect Wallet'}
        </ButtonDisconnect>
      )}
    </Container>
  )
}
