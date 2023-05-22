import { createTransferInstruction,PROGRAM_ID as BUBBLEGUM_PROGRAM_ID} from "@metaplex-foundation/mpl-bubblegum";
import { loadWalletKey, sendVersionedTx } from "./utils";
import { AccountMeta, Connection, Keypair, PublicKey, SystemProgram, Transaction, VersionedMessage } from "@solana/web3.js";
import { SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID, ValidDepthSizePair, getConcurrentMerkleTreeAccountSize } from "@solana/spl-account-compression";
import { SYSTEM_PROGRAM_ID } from "@raydium-io/raydium-sdk";
import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
  } from "@metaplex-foundation/mpl-token-metadata";
import { getAsset, getAssetProof } from "./readAPI";
import * as bs58 from "bs58";


export async function transferCNFT(asset: string, owner: string) {
    // const keypair = loadWalletKey("CNFTr56CpwLA8jrAbFfvMn4MJznNCaYoKvTkTgMgfinL.json");
    const keypair = new PublicKey("mfiJeLkWueenob2H2c6wPUYw4qLoGonE1tsnSBm7hjm");
    // const ky = Keypair.fromSecretKey(
    //   new Uint8Array([245,211,157,99,36,81,121,199,16,95,48,67,75,211,52,172,125,36,45,49,73,220,133,44,253,240,207,84,190,23,190,40,11,113,83,218,201,120,126,154,2,32,4,27,71,146,234,207,154,175,77,5,75,43,218,118,226,169,57,95,63,150,152,0]));
    const connection = new Connection("https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4");
    // const merkleTree = loadWalletKey("trRxrSbpQDtezi6fDyqRgAMVZ27mfTpRozNCihf3xv2.json").publicKey;
    const merkleTree = new PublicKey("trRxrSbpQDtezi6fDyqRgAMVZ27mfTpRozNCihf3xv2");

    const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
        [merkleTree.toBuffer()],
        BUBBLEGUM_PROGRAM_ID,
      );
      
    const assetId = asset;
    const res = await getAsset(assetId);
    // console.log(res)

    const proof = await getAssetProof(assetId);
    const proofPathAsAccounts = mapProof(proof);
    
    // console.log(proof)

    // console.log(res.compression.creator_hash)
    // console.log(res.compression.data_hash)
    // console.log(res.compression.asset_hash)
    // console.log(proof.root)
    const ix = await createTransferInstruction({
      treeAuthority: treeAuthority,
      leafOwner: keypair,
      leafDelegate: keypair,
      newLeafOwner: new PublicKey(owner),
      merkleTree: merkleTree,
      logWrapper: SPL_NOOP_PROGRAM_ID,
      compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      anchorRemainingAccounts: proofPathAsAccounts
    },
    {
      creatorHash: decode(res.compression.creator_hash),
      dataHash: decode(res.compression.data_hash),
      index: res.compression.leaf_id,
      nonce: res.compression.leaf_id, 
      root: decode(proof.root)
    });
    

    const sx = await sendVersionedTx(connection, [ix], keypair, [ky])
    console.log(sx);
}

function decode(stuff:string){
  return bufferToArray(bs58.decode(stuff))
}
function bufferToArray(buffer: Buffer): number[] {
  const nums :number[] = [];
  for (let i = 0; i < buffer.length; i++) {
    nums.push(buffer[i]);
  }
  return nums;
}
const mapProof = (assetProof: { proof: string[] }): AccountMeta[] => {
  if (!assetProof.proof || assetProof.proof.length === 0) {
    throw new Error("Proof is empty");
  }
  return assetProof.proof.map((node) => ({
    pubkey: new PublicKey(node),
    isSigner: false,
    isWritable: false,
  }));
};

// transferCNFT();
