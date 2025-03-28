import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util'
import { fromRpcSig } from 'ethereumjs-util'
import { BigNumber, BigNumberish, Wallet } from 'ethers'
import { encodeAbiParameters, keccak256, parseEther, toHex } from 'viem'
import Contracts from '../components/Contracts'
import { Addressable } from './Types'

const VERSION = '1'
const SEPOLIA_CHAIN_ID = 11155111
const PERMIT_TYPE: 'EIP712Domain' | 'Permit' = 'Permit'

const EIP712_DOMAIN = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
]

const PERMIT = [
  { name: 'owner', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' }
]

export const domainSeparator = (name: string, verifyingContract: `0x${string}`) => {
  const DOMAIN_TYPEHASH = keccak256(
    toHex('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
  )

  const encodedData = encodeAbiParameters(
    [{ type: 'bytes32' }, { type: 'bytes32' }, { type: 'bytes32' }, { type: 'uint256' }, { type: 'address' }],
    [DOMAIN_TYPEHASH, keccak256(toHex(name)), keccak256(toHex(VERSION)), BigInt(SEPOLIA_CHAIN_ID), verifyingContract]
  )

  const separator = keccak256(encodedData)

  return separator
}

export const permitData = (
  name: string,
  verifyingContract: string,
  owner: string,
  spender: string,
  amount: string,
  nonce: string,
  deadline: string
) => ({
  primaryType: PERMIT_TYPE,
  types: { EIP712Domain: EIP712_DOMAIN, Permit: PERMIT },
  domain: { name, version: VERSION, chainId: SEPOLIA_CHAIN_ID, verifyingContract },
  message: {
    owner,
    spender,
    value: parseEther(amount.toString()),
    nonce: nonce,
    deadline: deadline
  }
})

export interface Signature {
  v: number
  r: Buffer | string
  s: Buffer | string
}

export const permitCustomSignature = async (
  wallet: Wallet,
  name: string,
  verifyingContract: string,
  spender: string,
  amount: BigNumber,
  nonce: number,
  deadline: BigNumberish
): Promise<Signature> => {
  const data = permitData(name, verifyingContract, await wallet.getAddress(), spender, amount, nonce, deadline)
  const signedData = signTypedData({
    privateKey: Buffer.from(wallet.privateKey.slice(2), 'hex'),
    data,
    version: SignTypedDataVersion.V4
  })

  return fromRpcSig(signedData)
}

export const permitSignature = async (
  owner: Wallet,
  tokenAddress: string,
  spender: Addressable,
  amount: BigNumberish,
  deadline: BigNumberish
): Promise<Signature> => {
  const token = await Contracts.TestERC20Token.attach(tokenAddress)
  const nonce = await token.nonces(owner.address)

  return permitCustomSignature(
    owner,
    await token.name(),
    tokenAddress,
    spender.address,
    BigNumber.from(amount),
    nonce.toNumber(),
    BigNumber.from(deadline)
  )
}

// const structHash = keccak256(
//   encodeAbiParameters(
//     [
//       { type: 'bytes32' }, // PERMIT_TYPEHASH
//       { type: 'address' }, // owner
//       { type: 'address' }, // spender
//       { type: 'uint256' }, // value
//       { type: 'uint256' }, // nonce
//       { type: 'uint256' } // deadline
//     ],
//     [
//       PERMIT_TYPE_HASH as `0x${string}`,
//       address as `0x${string}`,
//       PERMIT_SWAP_ADDRESS as `0x${string}`,
//       parseEther(amountSell),
//       BigInt(nonce),
//       BigInt(getDeadlineTimestamp())
//     ]
//   )
// )
// const txHash = keccak256(
//   concat([
//     '0x1901', // \x19\x01
//     domainSeparator as `0x${string}`, // domainSeparator
//     structHash // structHash
//   ])
// )
// const signature = await signMessage(config, {
//   message: txHash,
//   account: address as `0x${string}`
// } as SignMessageParameters)
