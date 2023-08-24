import { useState, useEffect, createContext } from 'react'
import { Web3ContextData, Web3ProviderData } from './types'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils';
import VaquinhaFactory from '../../contracts/ABI/Crowdfunding.json'
import { WelcomeCard } from '../../components';

export const Web3Context = createContext<Web3ContextData>({} as Web3ContextData)

const CONTRACT_ABI = VaquinhaFactory as unknown as AbiItem
const CONTRACT_ADDRESS = "0x3060463bB04C53427937fa0281588618dfe02ED6"

export const Web3Provider = ({ children }: Web3ProviderData) => {
  const [web3, setWeb3] = useState<Web3>({} as Web3)
  const [contract, setContract] = useState<Contract>({} as Contract)
  const [loadingMetamask, setLoadingMetamask] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getWeb3()
  }, [])

  const getWeb3 = async () => {
    if (!window.ethereum) {
      setError("MetaMask não encontrada. Por favor, faça a instalação")
      setLoadingMetamask(false)
      return
    }

    await window.ethereum.enable();
    const newWeb3 = new Web3(window.ethereum)
    const accounts = await newWeb3.eth.requestAccounts()

    if (!accounts || !accounts.length) {
      setError("MetaMask não encontrada. Por favor, faça a instalação")
      setLoadingMetamask(false)
      return
    }

    setContract(
      new newWeb3.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS,
        { from: accounts[0]}
      )
    )

    setLoadingMetamask(false)
    setWeb3(newWeb3)
  }

  return (
    <Web3Context.Provider value={{ web3, contract, error, loadingMetamask }}>
      {
      loadingMetamask ? <WelcomeCard /> : children}
    </Web3Context.Provider>
  )
}