import { Spacer } from '../Basic'
import { Body, Container } from './styles'

import { Metamask } from '../Metamask'
import { TabBarSwitcher } from '../TabbarSwitcher'
import { useContentController } from './useContentController'

export function Content() {
  const {
    address,
    activeTab,
    availableChains,
    balanceContract,
    balanceWallet,
    chainId,
    contractOwner,
    customTokens,
    inEth,
    inEthError,
    isActiveAlphaToken,
    isActiveBetaToken,
    isActivePermitSwap,
    outEth,
    outEthError,
    swapError,
    tabs,

    clearSwapError,
    connectWallet,
    disconnectWallet,
    withdrawEthFromContract,
    sendEthToContract,
    onSwap,
    onChangeOutEth,
    onChangeInEth,
    onChangeChain,
    setActiveTab
  } = useContentController()

  return (
    <Body>
      <Container>
        <Metamask
          address={address as `0x${string}`}
          activeChainId={chainId}
          balanceWallet={balanceWallet}
          outEthError={outEthError}
          outEth={outEth}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          sendEthToContract={sendEthToContract}
          availableChains={availableChains}
          onChangeChain={onChangeChain}
          onChangeOutEth={onChangeOutEth}
        />
        <Spacer height={20} />
        <TabBarSwitcher activeTab={activeTab} tabs={tabs} onChangeTab={setActiveTab} />
        <Spacer height={20} />

        {/* {isActivePermitSwap && (
          <PermitSwap error={swapError} tokens={customTokens} clearSwapError={clearSwapError} onSwap={onSwap} />
        )}
        {isActiveBasic && (
          <ContractBase
            contractOwner={contractOwner as string}
            balanceContract={balanceContract}
            withdrawEthFromContract={withdrawEthFromContract}
            inEth={inEth}
            onChangeInEth={onChangeInEth}
            inEthError={inEthError}
          />
        )} */}
      </Container>
    </Body>
  )
}
