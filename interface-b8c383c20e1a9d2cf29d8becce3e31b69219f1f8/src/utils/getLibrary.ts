//import { Web3Provider } from '@ethersproject/providers'
import { Web3Provider } from 'zksync-web3'

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}
