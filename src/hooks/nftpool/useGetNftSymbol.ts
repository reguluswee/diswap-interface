import {useCallback, useEffect, useState} from 'react';
import {getNftSymbol} from '../../data/nftpool';

const useGetNftSymbol = (
    nftContract:any,
)=>{

    const[nftname,setNftname] = useState<string>();

    const nftsymbol = useCallback(async () =>{

            const symbol = await getNftSymbol(nftContract)
            setNftname(symbol);

    }, [nftContract]);

    useEffect(() => {
        if (nftContract ) {
            nftsymbol();
        }
    }, [nftContract]);


    return nftname;


};

export default useGetNftSymbol;