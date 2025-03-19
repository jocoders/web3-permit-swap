import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/5c2f1c28cb364cb0a1fe1838b674f9b1'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/5c2f1c28cb364cb0a1fe1838b674f9b1')
  }
})
