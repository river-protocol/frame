import { QueryClient } from '@tanstack/react-query'
import { defineChain } from 'viem'
import { http, createConfig, createStorage } from 'wagmi'
import {
  arbitrum,
  arbitrumNova,
  arbitrumSepolia,
  base,
  baseSepolia,
  degen,
  gnosis,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

const metalL2 = defineChain({
  id: 1740,
  name: 'Metal L2 Testnet',
  nativeCurrency: { name: 'Metal L2 Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.metall2.com/"]
    }
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://testnet.explorer.metall2.com/'
    },
  },
})

export const config = createConfig({
  chains: [
    mainnet,
    arbitrum,
    arbitrumNova,
    arbitrumSepolia,
    base,
    baseSepolia,
    degen,
    gnosis,
    metalL2,
    optimism,
    optimismSepolia,
    sepolia,
    polygon,
    zora,
  ],
  connectors: [
    coinbaseWallet({ appName: 'Frog Devtools', headlessMode: true }),
    walletConnect({
      projectId: '3fbb6bba6f1de962d911bb5b5c9dba88',
      showQrModal: false,
    }),
  ],
  storage: createStorage({ storage: localStorage, key: 'frog' }),
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumNova.id]: http(),
    [arbitrumSepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [degen.id]: http(),
    [gnosis.id]: http(),
    [metalL2.id]: http(),
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [zora.id]: http(),
  },
})

export const queryClient = new QueryClient()

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
