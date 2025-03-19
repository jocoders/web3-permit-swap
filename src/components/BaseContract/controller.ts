import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { getBalance, simulateContract } from 'wagmi/actions'
import { config } from '../../config'
import { BASIC_CONTRACT_ABI, BASIC_CONTRACT_ADDRESS } from '../../const/contract'

export function useContractBaseController() {
  const { address } = useAccount()
  const [balanceContract, setBalanceContract] = useState('')
  const [transactionHash, setTransactionHash] = useState('')

  const [inEth, setInEth] = useState('')
  const [inEthError, setInEthError] = useState('')

  const { writeContract } = useWriteContract()

  useEffect(() => {
    const getBalanceContract = async () => {
      try {
        const balContract = await getBalance(config, {
          address: BASIC_CONTRACT_ADDRESS
        })
        setBalanceContract(balContract.formatted)
      } catch (error) {
        console.error('Error fetching balances:', error)
      }
    }

    if (address) {
      getBalanceContract()
    }
  }, [address, transactionHash])

  const { data: contractOwner } = useReadContract({
    address: BASIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BASIC_CONTRACT_ABI,
    functionName: 'owner',
    args: []
  })

  const withdrawEthFromContract = async () => {
    try {
      const { request } = await simulateContract(config, {
        address: BASIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: BASIC_CONTRACT_ABI,
        functionName: 'withdraw',
        args: [address, parseEther(inEth)]
      })

      const hash = writeContract(request)
      console.log('hash', hash)

      setInEth('')
    } catch (error) {
      setInEthError('Error withdrawing ETH')
      console.error('Error withdrawing ETH:', error)
    }
  }

  const onChangeInEth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInEthError('')
    setInEth(e.target.value)
  }

  return { contractOwner, balanceContract, withdrawEthFromContract, inEth, onChangeInEth, inEthError }
}
