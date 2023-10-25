// import { ethers } from 'ethers';
// import { BigNumber } from 'bignumber.js';

import {
    ORISWAP_NFTPOOL_CONTRACT,
    ORI_CONTRACT,
    NFT_CONTRACT,
} from '../../constants/nftpool';

export function getNFTPoolContract(chainId: number, web3: any) {
    if (!(ORISWAP_NFTPOOL_CONTRACT as any)[chainId]) {
        return;
    }
    const oriswapLPContract = new web3.eth.Contract(
        (ORISWAP_NFTPOOL_CONTRACT as any)[chainId].abi,
        (ORISWAP_NFTPOOL_CONTRACT as any)[chainId].address,
    );
    return oriswapLPContract;
}

export function getORIContract(chainId: number, web3: any) {
    if (!(ORI_CONTRACT as any)[chainId]) {
        return;
    }
    const oriswapTokenContract = new web3.eth.Contract(
        (ORI_CONTRACT as any)[chainId].abi,
        (ORI_CONTRACT as any)[chainId].address,
    );
    return oriswapTokenContract;
}

export function getNFTContract(chainId: number,web3: any,adress: string) {
    if (!(NFT_CONTRACT as any)[chainId]) {
        return;
    }
    const oriswapNftContract = new web3.eth.Contract(
        (NFT_CONTRACT as any)[chainId].abi,
        (NFT_CONTRACT as any)[chainId].address=adress,
    );

    return oriswapNftContract;
}

export async function ApprovalForAll(
    nftContract: any,
    nftpoolAddress: any,
    accountAddress: string,
) {
    return nftContract.methods
        .setApprovalForAll(
            nftpoolAddress,
            true,
        )
        .send({ from: accountAddress });
}


export async function stake(
    nftpoolContract: any,
    pid: number,
    tokenids: number[],
    accountaddress: string,
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        nftpoolContract.methods
            .deposit(
                pid,
                tokenids,
            )
            .send({
                from: accountaddress,
            })
            .on('transactionHash', (tx: any) => {
                resolve(tx.transactionHash);
            })
            .catch((e: any) => {
                reject(e);
            });
    });
}

export async function harvest(
    nftpoolContract: any,
    pid: number,
    wtokenids: number[],
    accountaddress: string,
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        nftpoolContract.methods
            .harvest(
                pid,
                accountaddress,
                wtokenids,
            )
            .send({
                from: accountaddress,
            })
            .on('transactionHash', (tx: any) => {
                resolve(tx.transactionHash);
            })
            .catch((e: any) => {
                reject(e);
            });
    });
}

export async function withdraw(
    nftpoolContract: any,
    pid: number,
    wtokenids: number[],
    accountaddress: string,
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        nftpoolContract.methods
            .withdraw(
                pid,
                wtokenids,
            )
            .send({
                from: accountaddress,
            })
            .on('transactionHash', (tx: any) => {
                resolve(tx.transactionHash);
            })
            .catch((e: any) => {
                reject(e);
            });
    });
}

export async function getpoolPending(
    poolcontract: any,
    pid: number,
    wnftTokenids:number[],
): Promise<any> {
    return new Promise((resolve, reject) => {
        poolcontract.methods.pending(pid,wnftTokenids).call({}, (err: any, data: any) => {
            if (err) {
                console.error('get getpoolPending hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
}

export async function getpoolLength(
    poolcontract: any,
): Promise<any> {
    return new Promise((resolve, reject) => {
        poolcontract.methods.poolLength().call({}, (err: any, data: any) => {
            if (err) {
                console.error('get poolLength hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
}

export async function getPoolInfo(
    poolcontract: any,
    pid: number,
): Promise<any>{
    return new Promise((resolve, reject) => {
        poolcontract.methods.poolInfos(pid).call({}, (err: any, data: any) => {
            if (err) {
                console.error('get poolLength hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
   /* try{
        const poolInfo =  await poolcontract.methods.poolInfos(pid).call();
        return {
            poolInfo
        }
    }catch(e){
        console.error("getPoolInfo=",e)
        return undefined;
    }*/

}
export async function getNftSymbol(
    nftcontract: any,
): Promise<any>{
    return new Promise((resolve, reject) => {
        nftcontract.methods.symbol().call({}, (err: any, data: any) => {
            if (err) {
                console.error('get getNftSymbol hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
}

export async function getNftMetadata(
    nftcontract: any,
    tokenid: number,
): Promise<any>{
    return new Promise((resolve, reject) => {
        nftcontract.methods.tokenURI(tokenid).call({}, (err: any, data: any) => {
            if (err) {
                console.error('get getNftMetadata hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
}

export async function getIsApprovedForAll(
    nftcontract: any,
    nftpoolAddress: any,
    account: string,
): Promise<any> {
    return new Promise((resolve, reject) => {
        nftcontract.methods.isApprovedForAll(account, nftpoolAddress)
            .call({}, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
    });
}

export async function getNftSymbolName(nftcontract: any) {
    try {


        const symbol = await nftcontract.mether.symbol.calls();

        return {
            SYMBOL: symbol,
        };
    }catch (e) {
        return e.message;
    }

}
export async function getNftMetadataString(
    nftcontract: any,
    tokenid: number,
){
    const tokenURI = nftcontract.methods.tokenURI(tokenid).call();
    return {
        tokenURI: tokenURI,
    };
}

export async function getDecimalsOfToken(
    contract: any,
): Promise<any> {
    return new Promise((resolve, reject) => {
        contract.methods.decimals().call({}, (err: any, data: any) => {
            if (err) {
                console.error('get decimals hooks error')
                reject(err);
            }
            resolve(data);
        });
    });
}