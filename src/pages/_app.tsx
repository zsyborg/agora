import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";

const endpoint = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4"


const ConnectWallet = dynamic(
  () => import("./web3/WalletProvider"),
  {
    ssr: false,
  }
);


export default function App({ Component, pageProps }: AppProps) {


  return (
    <div className='min-h-screen h-screen'>

    <ConnectionProvider endpoint={endpoint}>
    <ConnectWallet>
      <Component {...pageProps} />
    </ConnectWallet>
  </ConnectionProvider>
    </div>
  )
}
