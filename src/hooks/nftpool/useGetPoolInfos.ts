import { useCallback } from 'react';
import {getPoolInfo} from '../../data/nftpool';

const useGetPoolInfos = (
    nftpoolContract: any,
) => {
    const fetchNftPoolInfos = useCallback(async (pid : number) => {
        try{
            if(nftpoolContract){
                const poolInfos = await getPoolInfo(nftpoolContract,pid);
                return poolInfos;
            }else{
                return undefined;
            }

        }catch (e) {
            return undefined;
        }
        },[nftpoolContract]
    );
    return {fetchNftPoolInfos};
};

export default useGetPoolInfos;