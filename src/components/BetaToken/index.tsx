import betaLogo from '../../../public/beta.webp'
import { TOKEN_BETA_ADDRESS } from '../../const/contract'
import { Header, Image, Row, Spacer, Text } from '../Basic'
import { DoubleInputBlock } from '../DoubleInputBlock'
import { InputBlock } from '../InputBlock'

import { useBetaTokenController as useController } from './controller'
import { Container } from './styles'

export const BetaToken = () => {
  const {
    contractOwner,
    domainSeparator,
    getNonce,
    getUserBalance,
    mintAddress,
    mintAmount,
    mintError,
    mintTokens,
    mintResult,
    nonce,
    nonceError,
    nonceOwnerAddress,
    setNonceOwnerAddress,
    setUserBalanceAddress,
    setMintAddress,
    setMintAmount,
    setTransferAddress,
    setTransferAmount,
    userBalance,
    userBalanceError,
    userBalanceAddress,
    transferAddress,
    transferAmount,
    transferError,
    transferResult,
    transferTokens
  } = useController()

  return (
    <Container>
      <Row>
        <Image source={betaLogo} alt="Beta Logo" />
        <Header text="Beta Token" />
      </Row>
      <Spacer height={10} />
      {!!contractOwner && typeof contractOwner === 'string' && (
        <Text>{`Contract owner: ${contractOwner?.substring(0, 6)}...${contractOwner?.substring(38)}`}</Text>
      )}
      <Spacer height={4} />
      <Text>{`Contract address: ${TOKEN_BETA_ADDRESS}`}</Text>
      <Spacer height={4} />
      <Text>{`Domain separator: ${domainSeparator ?? 0}`}</Text>
      <Spacer height={10} />
      <InputBlock
        buttonTitle="Get user nonce"
        error={nonceError}
        placeholder="Enter owner address"
        resultPlaceholder="Nonce"
        value={nonceOwnerAddress}
        onClick={getNonce}
        result={nonce}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNonceOwnerAddress(e.target.value)}
      />
      <Spacer height={10} />
      <InputBlock
        buttonTitle="Get user balance"
        error={userBalanceError}
        placeholder="Enter user address"
        resultPlaceholder="Balance"
        value={userBalanceAddress}
        onClick={getUserBalance}
        result={userBalance}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserBalanceAddress(e.target.value)}
      />
      <Spacer height={10} />
      <DoubleInputBlock
        buttonTitle="Mint tokens"
        error={mintError}
        placeholder1="Enter mint address"
        placeholder2="Enter mint amount"
        resultPlaceholder="Minted"
        result={mintResult}
        value1={mintAddress}
        value2={mintAmount}
        onClick={mintTokens}
        onChange1={(e: React.ChangeEvent<HTMLInputElement>) => setMintAddress(e.target.value)}
        onChange2={(e: React.ChangeEvent<HTMLInputElement>) => setMintAmount(e.target.value)}
      />
      <Spacer height={10} />
      <DoubleInputBlock
        buttonTitle="Transfer tokens"
        error={transferError}
        placeholder1="Enter transfer address"
        placeholder2="Enter transfer amount"
        resultPlaceholder="Transferred"
        result={transferResult}
        value1={transferAddress}
        value2={transferAmount}
        onClick={transferTokens}
        onChange1={(e: React.ChangeEvent<HTMLInputElement>) => setTransferAddress(e.target.value)}
        onChange2={(e: React.ChangeEvent<HTMLInputElement>) => setTransferAmount(e.target.value)}
      />
    </Container>
  )
}
