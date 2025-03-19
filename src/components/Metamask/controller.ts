import { useEffect, useMemo, useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useConnect } from 'wagmi'
import { disconnect, getBalance, getChainId, getChains, sendTransaction, switchChain } from 'wagmi/actions'
import { injected } from 'wagmi/connectors'
import { config } from '../../config'
import { BASIC_CONTRACT_ADDRESS } from '../../const/contract'

export function useMetamskController() {
  const { address } = useAccount()
  const { connect } = useConnect()
  const chains = getChains(config)

  const [outEth, setOutEth] = useState('')
  const [outEthError, setOutEthError] = useState('')
  const [balanceWallet, setBalanceWallet] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [activeChainId, setActiveChainId] = useState(getChainId(config))

  useEffect(() => {
    const getBalanceContract = async () => {
      try {
        const balWallet = await getBalance(config, {
          address: address as `0x${string}`
        })
        setBalanceWallet(balWallet.formatted)
      } catch (error) {
        console.error('Error fetching balances:', error)
      }
    }

    if (address) {
      getBalanceContract()
    }
  }, [address, transactionHash, activeChainId])

  const availableChains = useMemo(() => {
    return chains.map((item) => {
      return {
        id: item.id,
        name: item.name
      }
    })
  }, [chains])

  const sendEthToContract = async () => {
    try {
      await sendTransaction(config, {
        to: BASIC_CONTRACT_ADDRESS,
        value: parseEther(outEth)
      })
      setOutEth('')
    } catch (error) {
      setOutEthError('Error sending ETH')
      console.error('Error sending ETH:', error)
    }
  }

  const connectWallet = async () => {
    if (!address) {
      connect({ connector: injected() })
    }
  }

  const disconnectWallet = async () => {
    await disconnect(config)
  }

  const onChangeChain = async (id: number) => {
    try {
      await switchChain(config, { chainId: id as 1 | 11155111 })
      setActiveChainId(id)
    } catch (error) {
      console.error('LOG: Error switching chain:', error)
    }
  }

  const onChangeOutEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutEthError('')
    setOutEth(e.target.value)
  }

  return {
    address,
    activeChainId,
    availableChains,
    balanceWallet,
    connectWallet,
    disconnectWallet,
    onChangeChain,
    onChangeOutEth,
    sendEthToContract,
    outEth,
    outEthError
  }
}
