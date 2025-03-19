import { readContract, simulateContract } from '@wagmi/core'
import { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'

import { parseEther } from 'viem'
import { config } from '../../config'
import { PERMIT_TOKEN_ABI, TOKEN_BETA_ADDRESS } from '../../const/contract'

export function useBetaTokenController() {
  const { writeContract } = useWriteContract()

  const [nonceOwnerAddress, setNonceOwnerAddress] = useState('')
  const [nonce, setNonce] = useState('')
  const [nonceError, setNonceError] = useState('')

  const [userBalanceAddress, setUserBalanceAddress] = useState('')
  const [userBalance, setUserBalance] = useState('')
  const [userBalanceError, setUserBalanceError] = useState('')

  const [mintAddress, setMintAddress] = useState('')
  const [mintResult, setMintResult] = useState('')
  const [mintAmount, setMintAmount] = useState('')
  const [mintError, setMintError] = useState('')

  const [transferAddress, setTransferAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferResult, setTransferResult] = useState('')
  const [transferError, setTransferError] = useState('')

  const { data: domainSeparator } = useReadContract({
    address: TOKEN_BETA_ADDRESS as `0x${string}`,
    abi: PERMIT_TOKEN_ABI,
    functionName: 'DOMAIN_SEPARATOR',
    args: []
  })

  const { data: contractOwner } = useReadContract({
    address: TOKEN_BETA_ADDRESS as `0x${string}`,
    abi: PERMIT_TOKEN_ABI,
    functionName: 'owner',
    args: []
  })

  const getNonce = async () => {
    if (!nonceOwnerAddress) return
    setNonceError('')
    try {
      const result = await readContract(config, {
        abi: PERMIT_TOKEN_ABI,
        address: TOKEN_BETA_ADDRESS as `0x${string}`,
        functionName: 'nonces',
        args: [nonceOwnerAddress as `0x${string}`]
      })
      setNonce(Number(result).toString())
    } catch (error) {
      setNonceError(error as string)
    }
  }

  const getUserBalance = async () => {
    if (!userBalanceAddress) return
    setUserBalanceError('')
    try {
      const result = await readContract(config, {
        abi: PERMIT_TOKEN_ABI,
        address: TOKEN_BETA_ADDRESS as `0x${string}`,
        functionName: 'balanceOf',
        args: [userBalanceAddress as `0x${string}`]
      })
      setUserBalance(Number(result).toString())
    } catch (error) {
      setUserBalanceError(error as string)
    }
  }

  const mintTokens = async () => {
    if (!mintAddress || !mintAmount) return
    setMintError('')
    setMintResult('')
    try {
      const { request } = await simulateContract(config, {
        abi: PERMIT_TOKEN_ABI,
        address: TOKEN_BETA_ADDRESS,
        functionName: 'mint',
        args: [mintAddress, parseEther(mintAmount)]
      })

      await writeContract(request)
      setMintResult(mintAmount.toString())
    } catch (error) {
      setMintError(error as string)
    }
  }

  const transferTokens = async () => {
    if (!transferAddress || !transferAmount) return
    setTransferError('')
    setTransferResult('')
    try {
      const { request } = await simulateContract(config, {
        abi: PERMIT_TOKEN_ABI,
        address: TOKEN_BETA_ADDRESS,
        functionName: 'transfer',
        args: [transferAddress, parseEther(transferAmount)]
      })

      await writeContract(request)
      setTransferResult(transferAmount.toString())
    } catch (error) {
      setTransferError(error as string)
    }
  }

  return {
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
  }
}
