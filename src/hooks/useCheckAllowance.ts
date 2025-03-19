import { useReadContract } from 'wagmi'
import { UNISWAP_CONTRACT_ABI, UNISWAP_CONTRACT_ADDRESS } from '../const/contract'

export function useCheckAllowance(tokenName: string, user: `0x${string}`) {
  const { data: allowance } = useReadContract({
    address: UNISWAP_CONTRACT_ADDRESS,
    abi: UNISWAP_CONTRACT_ABI,
    functionName: 'checkAllowance',
    args: [tokenName, user]
  })

  return allowance ?? BigInt(0)
}
