import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "../utils/constants"

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  )

  console.log({
    provider,
    signer,
    transactionContract,
  })
}

// TODO: Utilize getEthereumContract()

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask")

      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length) {
        setConnectedAccount(accounts[0])

        //getAllTransactions()
      } else {
        console.log("No accounts found")
      }
      // console.log(accounts)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object")
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      setConnectedAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object")
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
      {children}
    </TransactionContext.Provider>
  )
}
