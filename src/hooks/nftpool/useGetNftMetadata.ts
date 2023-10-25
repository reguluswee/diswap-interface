import {useCallback} from 'react';
import {getNftMetadata} from '../../data/nftpool';

const useGetNftMetadata = (
    nftContract:any,
)=>{
    const fetchNftMetadata = useCallback(async (tokenid: number) => {
        try {
            if(nftContract) {
                const tokenURI = await getNftMetadata(nftContract, tokenid);
                return String(tokenURI);
            }else{
                return undefined;
            }
        }catch (e) {
            return undefined;
        }
    }, [nftContract]);

    return {fetchNftMetadata};

};

export default useGetNftMetadata;