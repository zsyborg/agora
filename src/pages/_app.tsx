import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";

const endpoint = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4"
import {convertAniBinaryToCSS} from 'ani-cursor';


const ConnectWallet = dynamic(
  () => import("../web3/WalletProvider"),
  {
    ssr: false,
  }
);

async function applyCursor(selector, aniUrl) {
  const response = await fetch(aniUrl);
  const data = new Uint8Array(await response.arrayBuffer());

  const style = document.createElement('style');
  style.innerText = convertAniBinaryToCSS(selector, data);

  document.head.appendChild(style);
}

// applyCursor("#main", "https://archive.org/cors/tucows_169906_Pizza_cursor/pizza.ani");
applyCursor("#main", "http://localhost:3000/linkselect.ani");

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <div className='min-h-screen' id='main'>

    <ConnectionProvider endpoint={endpoint}>
    <ConnectWallet>
      <Component {...pageProps} />
    </ConnectWallet>
  </ConnectionProvider>
    </div>
  )
}
