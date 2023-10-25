import { useCallback } from 'react';
import {getpoolLength} from '../../data/nftpool';

const useGetPoolLength = (
    contract:any,
)=>{
    const nftpoolLength = useCallback(async () =>{
        try {
            if (contract) {

                const length = await getpoolLength(contract)
                // const length = await getpoolLengthTwo(contract);
                return length

            } else {
                return undefined;
            }
        }catch(e){
            return undefined;
        }

    }, [contract]);

    return {
        nftpoolLength
    };


};

export default useGetPoolLength;