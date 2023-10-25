// import useGetNftMetadata from "./nftpool/useGetNftMetadata";
import {useEffect, useState} from "react";


export default function useGetNftMeta(nftMetadata:any, options:string[],isOpen:boolean) {

    const [nftimeta,setNftmeta] = useState<string[]>();
    async function getNftimgInitData() {
        if(options && isOpen) {
            let imgtemp =[];
            for (let i = 0; i < options.length; i++) {
                const tokenmetadata = await nftMetadata.fetchNftMetadata(Number(options[i]));
                imgtemp.push(String(tokenmetadata));
            }
            setNftmeta(imgtemp);
        }
    }

    useEffect(() => {
        if(nftMetadata && isOpen){
            getNftimgInitData();
        }
    },[nftMetadata,isOpen]);

    return {
        nftimeta,
    }
}