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
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null)
  const [formData, setFormdata] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  )

  const handleChange = (e, name) => {
    setFormdata((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }))
  }

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

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask")

      const { addressTo, amount, keyword, message } = formData
      const transactionContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208", //21000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      )
      setLoading(true)
      console.log(`Loading transaction ${transactionHash.hash}`)
      await transactionHash.wait()
      setLoading(false)
      console.log(`Success Transaction ${transactionHash.hash} mined`)

      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(transactionCount.toNumber())
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
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
