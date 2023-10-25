// import useGetNftMetadata from "./nftpool/useGetNftMetadata";
import {useEffect, useState} from "react";


export default function useGetNftImgs(nftmeta:string[],isOpen:boolean) {

    const [nftimgs,setNftimgs] = useState<string[]>();
    async function getNftimgInitData() {
        try {
            if (nftmeta && isOpen) {
                for (let i = 0; i < nftmeta.length; i++) {
                    let imgtemp = [];
                    const response = await fetch(nftmeta[i], {
                        method: 'GET',
                        body: undefined,
                        mode: "no-cors",
                    });
                    if (!response.ok) {
                        setNftimgs(undefined);
                        // throw new Error(`Error! status: ${response.status}`);
                    }else{
                        const result = await response.json();
                        console.log(result);
                        if(result){
                            imgtemp.push(String(result.image))
                            setNftimgs(imgtemp);
                        }
                    }

                    // if(result && result.code === "0"){
                    //     let imgtemp = [];
                    //     for(let i=0;i<result.data[0].tokenList.length;i++){
                    //         imgtemp.push(String(result.data[0].tokenList[i].tokenId))
                    //     }
                    //     setNftimgs(imgtemp);;
                    // }else{
                    //     setNftimgs(undefined);
                    // }
                }
            }
        }catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if(nftmeta && isOpen){
            getNftimgInitData();
        }
    },[nftmeta,isOpen]);

    return {
        nftimgs,
    }
}