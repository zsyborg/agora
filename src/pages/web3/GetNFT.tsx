import React from "react";
import web3, { PublicKey } from '@solana/web3.js';
import { GetProgramAccountsFilter, Connection, AccountInfo } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, useState, useEffect } from 'react';
import axios from "axios";
import { data } from 'autoprefixer';
import NFTCard from '../components/NFTCard';

let dt = "";
// const { connection } = useConnection();
const TPI = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

/*
async function getTokenAccounts(wallet: string, connect: Connection) {
  
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: wallet, // base58 encoded string
          },            
        }];


    const accounts = await connect.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {
          filters: filters,
        }
      );
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}: `);
    if(accounts.length === 0) {
        return(<div>No Token Accounts Found</div>)
    }
    else{
        const rows = accounts.map((account,i)=>{
            //Parse the account data
            const parsedAccountInfo:any = account.account.data;
            const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
            const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
            return (
            <tr key={i+1}>
                <td key={'index'}>{i+1}</td>
                <td key={'mint address'}>{mintAddress}</td>
                <td key={'balance'}>{tokenBalance}</td>
            </tr>)
        })
        const header = (<tr>
            <th>Token No.</th>
            <th>Mint Address</th>
            <th>Qty</th>
        </tr>)
        setTokenTable(<table>{header}{rows}</table>)
    }
}
*/
// https://few-hidden-aura.solana-mainnet.discover.quiknode.pro/df1981120c63443a60e666489992f43a604cfa9c/

// const helius = "https://rpc-devnet.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4";
const helius = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4";
let publicKey = "";
let cnft = '';

const Displaynft = (dt: any) =>{
  return(
    <div>
      <NFTCard name={dt} />
      {/* <p>{dt}</p> */}
    </div>
  )
}

const onClick = async (wallet: string) => {
  const [nft, setNFTs] = useState()
  const connection = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4";
  const connect = new Connection(connection);
  const pub = new PublicKey("3B6aostwcwc1Tor1d2aYiU2zvY5VkbZYqedBtwTtp1B3")
  // const accounts = connect.getBalance(pub)
  // console.log(pub.toBase58())
  // const [color, setColor] = useEffect();

  const owner = "CNFTr56CpwLA8jrAbFfvMn4MJznNCaYoKvTkTgMgfinL";
  const limit = 50;
    const page = 1;
    const before = "";
    const after = "";
    const sortBy = {
      "sortBy": "created",
      "sortDirection": "asc"
    };
  const { data } = await axios.post(helius, {
    
      jsonrpc: "2.0",
      id: "",
      method: "getAssetsByOwner",
      params: [
        owner,
        sortBy,
        limit,
        page,
        before,
        after
      ]
    }); 
    dt = data.result.total;
    // console.log(dt);
  // setColor(data.result.items[4].content.metadata.name)
  setNFTs(dt)
  // console.log(data.result)
  return dt;
}

/*
const GetNFT = () => {
  onClick("3B6aostwcwc1Tor1d2aYiU2zvY5VkbZYqedBtwTtp1B3");
  // const [tokenTable, setTokenTable] = useState(null);
  return (
    <div className='flex items-center pt-40 justify-center flex-col'>
      <button
            className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
            // onClick={onClick} 
            onClick={onClick}
        >
          <p>
           {dt}
          </p>
            <span>Get Token Accounts</span>
        </button>
    </div>
  )
}
*/

export default Displaynft