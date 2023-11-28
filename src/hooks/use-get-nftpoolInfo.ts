import {useEffect,  useState} from 'react';
import useGetPoolInfos from "./nftpool/useGetPoolInfos";
import {DEFAULT_ACTIVE_NFT_LIST_URLS} from "../constants/lists";
import useGetNftFloorPrice from "./nftpool/useGetNftFloorPrice";
import {useTranslation} from "react-i18next";
import {BigNumber} from "bignumber.js";
// import uriToHttp from "../utils/uriToHttp";
export interface PoolCaculateData {
    id: string,
    wnft: string,
    wnftsymbol: string,
    nft: string,
    nftsymbol: string,
    startBlock: number,
    currentRewardIndex: number,
    currentRewardEndBlock: number,
    amount: number,
    lastRewardBlock: number,
    accTokenPerShare: number,
    dividendToken: string,
    accDividendPerShare: number,
    depositFee: number,
    logoURI: string,
    mussesId:string,
    realTvl: number,
    tvl: string,
}

export interface NftListData {
    pid: number,
    nftsymbol: string,
    nftaddress:string,
    wnftsymbol: string,
    wnftaddress: string,
    logoURI: string;
}




export default function useGetNftpoolInfos(nftpoolContract:any,chainId: number,web3: any) {
    const { t } = useTranslation();
    const [ nftpoolCaculateInfo, setNftPoolCaculateInfo] = useState<PoolCaculateData[]>();
    // const [nftContract, setNftContract] = useState<any>(null);
    // const [ nftListDatas, setNftListDatas] = useState<NftListData[]>();

    // const { nftpoolLength } =useGetPoolLength(nftpoolContract);
    const { fetchNftPoolInfos } = useGetPoolInfos(nftpoolContract);
    const {fetchNftFloorPrice} = useGetNftFloorPrice();

    async function getPoolInitData() {



        let response  = await fetch(DEFAULT_ACTIVE_NFT_LIST_URLS[0]);
        // const nftlists = await response.json();
        const nftlists = JSON.parse(await response.text());
        // console.log("pid=",nftlists.tokens.length);

        // const poollength = await nftpoolLength();
        if(nftlists && nftlists.tokens.length>0){
            let poolInfoData = [];
            for (let i = 0; i < nftlists.tokens.length; i++ ) {

                const poolinfo:any = await fetchNftPoolInfos(nftlists.tokens[i].pid);

                // const nftContractInstance = nftutils.getNFTContract(chainId, web3, poolinfo.wnft);
                // console.log(nftContractInstance);
                // const symbolinfo1 = await getNftSymbolName(nftContractInstance);
                // setSymbolinfo(symbolinfo1);
                // console.log(symbolinfo)

                const nftfloodprice = await fetchNftFloorPrice(nftlists.tokens[i].nftaddress);
                // const nftfloodprice = await fetchNftFloorPrice("0x3035bb5fdd9597903776da28e41614e1b2ca39bc");

                let saveItem: PoolCaculateData = {
                    id: String(nftlists.tokens[i].pid),
                    wnft: poolinfo.wnft,
                    wnftsymbol: String(nftlists.tokens[i].wnftsymbol),
                    nft: nftlists.tokens[i].nftaddress,
                    nftsymbol: String(nftlists.tokens[i].nftsymbol),
                    startBlock: poolinfo.startBlock,
                    currentRewardIndex: poolinfo.currentRewardIndex,
                    currentRewardEndBlock: poolinfo.currentRewardEndBlock,
                    amount: poolinfo.amount,
                    lastRewardBlock: poolinfo.lastRewardBlock,
                    accTokenPerShare: poolinfo.accTokenPerShare,
                    dividendToken: poolinfo.dividendToken,
                    accDividendPerShare: poolinfo.accDividendPerShare,
                    depositFee: poolinfo.depositFee,
                    logoURI: nftlists.tokens[i].logoURI,
                    mussesId: String(nftfloodprice[1]),
                    realTvl: 0,
                    tvl: t('untracked'),
                }

                if(poolinfo.amount>0 && nftfloodprice[0]>0){
                    const realTvl = new BigNumber(poolinfo.amount)
                        .times(nftfloodprice[0])
                    saveItem.realTvl = realTvl.toNumber()
                    saveItem.tvl = `${realTvl.toFixed(3)} DIS`
                }

                poolInfoData.push(saveItem);
            }
            setNftPoolCaculateInfo(poolInfoData);
        }
    }

    // async function getNftList(){
    //     console.log("nftlist")
    //     // let urls: string[]
    //     // urls = uriToHttp(DEFAULT_ACTIVE_NFT_LIST_URLS[0])
    //
    //     let response  = await fetch(DEFAULT_ACTIVE_NFT_LIST_URLS[0]);
    //     // const nftlists = await response.json();
    //     const nftlists = JSON.parse(await response.text());
    //     console.log("pid=",nftlists.tokens.length);
    //     let nftInfoData = [];
    //
    //
    //     let nftinfo :NftListData={
    //         pid: 1,
    //         nftsymbol: 'string',
    //         nftaddress:'string',
    //         wnftsymbol: 'string',
    //         wnftaddress: 'string',
    //         logoURI: 'string',
    //     }
    //     nftInfoData.push(nftinfo);
    //
    //     // setNftListDatas(nftInfoData);
    // }


    // const intervalRef = useRef<any>();
    // function init() {
    //     getNftList()
    // }
    useEffect(() => {

        if(nftpoolContract){
            getPoolInitData();
        }

        // if (!intervalRef.current) {
        //     intervalRef.current = setInterval(init, 30000);
        // }

        // return () => {
        //     if (intervalRef.current) {
        //         clearInterval(intervalRef.current);
        //     }
        // }

    },[nftpoolContract]);
    return {
        nftpoolCaculateInfo,
    }
}