import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

type Web3ContextData = {
  web3: Web3,
  contract: Contract
  loadingMetamask: boolean,
  error?: string
}

type Web3ProviderData = {
  children: React.ReactNode
}

export { type Web3ContextData, type Web3ProviderData }