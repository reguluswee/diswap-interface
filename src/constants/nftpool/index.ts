import NFTPOOLABI from './nftPoolAbi';
import NFTABI from './nftAbi';
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "_spender", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "_from", "type": "address" },
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "_owner", "type": "address" },
            { "name": "_spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    { "payable": true, "stateMutability": "payable", "type": "fallback" },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "owner", "type": "address" },
            { "indexed": true, "name": "spender", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "from", "type": "address" },
            { "indexed": true, "name": "to", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" }
        ],
        "name": "Transfer",
        "type": "event"
    }
];
const ORISWAP_NFTPOOL_ABI = NFTPOOLABI;
const ORISWAP_NFT_ABI = NFTABI;


export const ORISWAP_NFTPOOL_CONTRACT = {
    256: {
        address: '0x85601937cd33893161DD03D34b6Da544F0E43543',
        abi: ORISWAP_NFTPOOL_ABI,
    },
    128: {
        address: '0xfF58c937343d4fCF65c9c1AAF25f49559D95488E',
        abi: ORISWAP_NFTPOOL_ABI,
    },
    513100: {
        address: '0xf3a396ea4479013f4959589b2698d34a1a25E994',
        abi: ORISWAP_NFTPOOL_ABI,
    },
};

export const ORI_CONTRACT = {
    256: {
        address: '0xB4BB4cE6330Ef2D5Dc0e6104627ea997228Ca046',
        abi: ERC20_ABI,
    },
    128: {
        address: '0x099626783842d35C221E5d01694C2B928eB3B0AD',
        abi: ERC20_ABI,
    },
    513100: {
        address: '0x5342F2CEE30ca8a8D1a971C375a3B5E73cF2733B',
        abi: ERC20_ABI,
    },
};
export const NFT_CONTRACT = {
    256: {
        address: '0xB4BB4cE6330Ef2D5Dc0e6104627ea997228Ca046',
        abi: ORISWAP_NFT_ABI,
    },
    128: {
        address: '0x099626783842d35C221E5d01694C2B928eB3B0AD',
        abi: ORISWAP_NFT_ABI,
    },
    513100: {
        address: '0x5342F2CEE30ca8a8D1a971C375a3B5E73cF2733B',
        abi: ORISWAP_NFT_ABI,
    },
};
