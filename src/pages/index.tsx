import { FC, useState, useEffect, type ReactElement, useRef } from 'react';
import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import web3, { PublicKey } from '@solana/web3.js';
import { GetProgramAccountsFilter, Connection, AccountInfo } from '@solana/web3.js';
import SelectAndConnectWalletButton from './web3/SelectAndConnectWalletButton';
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


import { transferCNFT } from './web3/transferCNFT';
import axios from "axios";
import { animate } from 'motion';
import { createThemeStyle } from '@arwes/theme';
import { Animator } from '@arwes/react-animator';
import { Text } from '@arwes/react-text';
import {
  type AnimatorControl,
  type AnimatorNode,
  type AnimatorDuration,
  type AnimatorSettingsPartial,
  ANIMATOR_DEFAULT_DURATION,
  ANIMATOR_DEFAULT_SETTINGS,
  createAnimatorSystem
} from '@arwes/animator';
import { FrameSVGOctagon, FrameSVGCorners } from '@arwes/react-frames';

import airdrop from '../final-1.json'


import NFTCard from '../components/NFTCard';
import App from './_app';
// import Displaynft from '../web3/GetNFT';
const connection = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4";
const connect = new Connection(connection);
const limit = 500;
const page = 1;
const before = "";
const after = "";
const sortBy = {
  "sortBy": "created",
  "sortDirection": "asc"
};

const style = createThemeStyle([
  { fontSize: '30px', color: 'red' },
  { fontSize: '24px', color: 'blue' },
  { fontSize: '18px', color: 'green' }
]);

let asst = ""
let wlt = ""
let ident = ""

//   return (
//     <div>
//       {/* <NFTCard name={nft} /> */}
//       <p>{dt}</p>
//     </div>
//     )
//   // return dt;
// }

// airdrop.forEach((a: any) => {
//   console.log(a.wallet + "\n")
//   console.log(a.uri + "\n")
// });

export default function Home() {
  
  const audioRef = useRef();
  const { publicKey } = useWallet();
  
  const onClick = () => {};
  
  const [nfts, setNFTs] = useState([]);
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    // setActive(active => !active)
    // const tid = setInterval(() => setActive(active => !active), 2000);
    return () => setActive(active);
  }, []);
  
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post(connection, {
          jsonrpc: "2.0",
          id: "",
          method: "getAssetsByOwner",
          params: [
          publicKey,
          sortBy,
          limit,
          page,
          before,
          after
        ]
      });
      const data = response.data;
      setNFTs(data.result.items);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  }


    if (publicKey) {
      fetchData()
    } else {
      
    }
      
  }, [publicKey])


const handlePlay = (ast: any, id: any) => {
  if (audioRef.current) {
    audioRef.current.play();
  }

  let wlt = airdrop.filter(a => a.uri === id)
  console.log("Sent to: " + wlt[0].wallet)
  transferCNFT(ast, wlt[0].wallet)

};

const initTransfer = () => {
  console.log("inited txn")
}

return (
  <main
      className='relative flex min-h-screen flex-col justify-center overflow-hidden'
    >
     
  <div className='grid grid-cols-12 gap-4 justify-center text-center'>
    
  
     <h1 className='heading'>AgorA</h1>
        
      <WalletMultiButton />
     </div>
    
  <div className=''>
    

     <p>
      {publicKey ? <>Your address: {publicKey.toBase58()}</> : null}
    </p>
      {
        /* publicKey ? condition : null
      }
      {/* <SelectAndConnectWalletButton/> */}
        
        <div className='grid grid-cols-4 gap-4'>
        {nfts.map((nft) => (

          <div className='border-4 border-solid border-blue-300 techFrame'>
            <div classname="flat"></div>
            <FrameSVGOctagon>

              { nft.content.files.map((u: any) => (
                
                <img src={u.uri} width={333} />
              ))}
                {
                  
                  // console.log(nft.content.metadata.name.replace("MechCats #", ""))
                  // ident = nft.content.metadata.name.replace("MechCats #", "")
                  
                }
              {/* <Animator active={active}>
      <Text as='p' style={{ color: '#ddd' }}> */}
        
                <h2 className='mt-4 text-3xl'>{nft.content.metadata.name}</h2>
                  <br/>
                <p>{nft.content.metadata.description}</p>
                  <br/>
                {/* <p>Group Address: {nft.grouping[0].group_value}</p>
                  <br/> */}
                {/* <p>Tree Address: {nft.compression.tree}</p> */}
                  <br/>
                {/* <p>Leaf ID: {nft.compression.leaf_id}</p> */}
                  <br/>
                {/* <p>Mint Address / Asset ID: {nft.id}</p> */}
              {/* Render other NFT properties */}
      {/* </Text>
    </Animator> */}
            <FrameSVGOctagon></FrameSVGOctagon>
              <br/>
                  <br/>
                    <a onClick={() => handlePlay(nft.id,  nft.content.metadata.name.replace("MechCats #", ""))} id="bleep" className='text-gray-100 bg-sky-700 hover:bg-fuchsia-950 px-8 py-2 bleep'>Send</a>
                    <audio ref={audioRef} src="/sound/click.mp3" />
    
                    </div>
                    ))}
            </div>
        </div>
    </main>
  )
}
