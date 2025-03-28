import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useSignTypedData, useWriteContract } from 'wagmi'
import { simulateContract } from 'wagmi/actions'
import { config } from '../../config'
import { PERMIT_SWAP_ABI, PERMIT_SWAP_ADDRESS, TOKEN_ALPHA_ADDRESS, TOKEN_BETA_ADDRESS } from '../../const/contract'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addOrder, clearOrders, removeOrders, setOrderId } from '../../store/ordersSlice'
import { TSwitcherItem } from '../Switcher'

export type TOrder = {
  owner: `0x${string}`
  tokenSell: `0x${string}`
  tokenBuy: `0x${string}`
  orderId: number
  amountSell: string
  amountBuy: string
  deadline: string
}

export type TSignature = {
  v: number
  r: string
  s: string
}

export type TOrderItem = {
  order: TOrder
  signature: TSignature
}

// https://github.com/clober-dex/coupon.finance/blob/ddf041cfc315d3e3173f0715d9450aa43af36a0e/utils/permit20.ts#L117
const SECONDS_IN_DAY = 86400 // 24 * 60 * 60

const ALPHA_DOMAIN_SEPARATOR = '0x6360f82815bc3054eae15149536b076fed05fc7f558b425ce87df59b86e5085b'
const BETA_DOMAIN_SEPARATOR = '0x9f8166df02fc2ad05843ee33da155c9896a951815987c3dbe7f608fadf29af6c'
const SEPOLIA_CHAIN_ID = 11155111
const VERSION = '1'

const SWITCHERS: TSwitcherItem[] = [
  {
    name: 'TokenAlpha',
    domainSeparator: ALPHA_DOMAIN_SEPARATOR,
    address: TOKEN_ALPHA_ADDRESS
  },
  {
    name: 'TokenBeta',
    domainSeparator: BETA_DOMAIN_SEPARATOR,
    address: TOKEN_BETA_ADDRESS
  }
]

export function usePermitSwapController() {
  const dispatch = useAppDispatch()
  const { orders, orderId } = useAppSelector((state) => state.orders)

  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  const { signTypedDataAsync } = useSignTypedData()

  const [tokenSell, setTokenSell] = useState<TSwitcherItem>(SWITCHERS[0])
  const [tokenBuy, setTokenBuy] = useState<TSwitcherItem>(SWITCHERS[1])

  const [amountSell, setAmountSell] = useState<string>('')
  const [amountBuy, setAmountBuy] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('1')
  const [nonce, setNonce] = useState<string>('')

  const [signError, setSignError] = useState<string>('')
  const [swapError, setSwapError] = useState<string>('')

  const createOrder = async () => {
    try {
      const deadline = BigInt(getDeadlineTimestamp())
      const data = {
        domain: {
          name: tokenSell.name,
          version: VERSION,
          chainId: BigInt(SEPOLIA_CHAIN_ID),
          verifyingContract: tokenSell.address as `0x${string}`
        },
        message: {
          owner: address as `0x${string}`,
          spender: PERMIT_SWAP_ADDRESS,
          value: parseEther(amountSell),
          nonce: BigInt(nonce),
          deadline
        },
        primaryType: 'Permit',
        types: {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ],
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ]
        }
      } as const
      const signature = await signTypedDataAsync(data)

      console.log('SIGN_DATA', data)

      const r = signature.slice(0, 66)
      const s = '0x' + signature.slice(66, 130)
      const v = parseInt(signature.slice(130, 132), 16)

      //console.log('SIGNATURE', { v, r, s })

      if (!!v && !!r && !!s) {
        const newOrder: TOrderItem = {
          order: {
            owner: address as `0x${string}`,
            tokenSell: tokenSell.address as `0x${string}`,
            tokenBuy: tokenBuy.address as `0x${string}`,
            amountSell: amountSell,
            amountBuy: amountBuy,
            orderId,
            deadline: deadline.toString()
          },
          signature: {
            v,
            r,
            s
          }
        }

        dispatch(addOrder(newOrder))
      }

      dispatch(setOrderId())
      setAmountSell('')
      setAmountBuy('')
      setNonce('')
      setDeadline('1')
    } catch (error) {
      setSignError(error as string)
      console.error('Error signing transaction:', error)
      throw error
    }
  }
  const getDeadlineTimestamp = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return currentTimestamp + Number(deadline) * SECONDS_IN_DAY
  }

  const executeOrders = async () => {
    const findMatchingOrders = (): [TOrderItem, TOrderItem] | null => {
      for (let i = 0; i < orders?.length; i++) {
        for (let j = i + 1; j < orders?.length; j++) {
          const order1 = orders[i]
          const order2 = orders[j]

          const tokensMatch =
            order1.order.tokenSell === order2.order.tokenBuy && order1.order.tokenBuy === order2.order.tokenSell
          const amountsMatch =
            order1.order.amountSell === order2.order.amountBuy && order1.order.amountBuy === order2.order.amountSell

          if (tokensMatch && amountsMatch) {
            return [order1, order2]
          }
        }
      }
      return null
    }

    const matchingOrders = findMatchingOrders()

    if (!matchingOrders) {
      console.error('No matching orders found')
      return
    }

    const [order1, order2] = matchingOrders

    if (!order1 || !order2) {
      console.error('No matching orders found')
      return
    }

    try {
      console.log('SEND_DATA1', {
        ...order1.order,
        deadline: BigInt(order1.order.deadline),
        amountSell: parseEther(order1.order.amountSell),
        amountBuy: parseEther(order1.order.amountBuy)
      })
      console.log('SEND_DATA2', {
        ...order2.order,
        deadline: BigInt(order2.order.deadline),
        amountBuy: parseEther(order2.order.amountBuy),
        amountSell: parseEther(order2.order.amountSell)
      })

      const { request } = await simulateContract(config, {
        abi: PERMIT_SWAP_ABI,
        address: PERMIT_SWAP_ADDRESS,
        functionName: 'swap',
        args: [
          {
            ...order1.order,
            deadline: BigInt(order1.order.deadline),
            amountSell: parseEther(order1.order.amountSell),
            amountBuy: parseEther(order1.order.amountBuy)
          },
          {
            ...order2.order,
            deadline: BigInt(order2.order.deadline),
            amountBuy: parseEther(order2.order.amountBuy),
            amountSell: parseEther(order2.order.amountSell)
          },
          order1.signature,
          order2.signature
        ]
      })

      await writeContract(request)
      dispatch(removeOrders([order1.order.orderId, order2.order.orderId]))
    } catch (error) {
      console.error('Error executing orders:', error)
      setSwapError(error as string)
      throw error
    }
  }
  return {
    amountSell,
    amountBuy,
    createOrder,
    clearOrders: () => dispatch(clearOrders()),
    deadline,
    executeOrders,
    nonce,
    orders,
    setNonce,
    setAmountSell,
    setAmountBuy,
    setDeadline,
    setTokenSell,
    setTokenBuy,
    signError,
    swapError,
    tokenSell,
    tokenBuy,
    switchers: SWITCHERS
  }
}
