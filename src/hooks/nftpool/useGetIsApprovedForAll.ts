import {useCallback, useEffect, useState} from 'react';
import {getIsApprovedForAll} from '../../data/nftpool';

const useGetIsApprovedForAll = (
    nftcontract: any,
    nftpoolAddress: any,
    account: string,
    refresh?: boolean,
)=>{

    const[isApprove,setIsApprove] = useState(false);

    const fetchnftIsApprove = useCallback(async () =>{
            const isApproveForAll = await getIsApprovedForAll(nftcontract,nftpoolAddress._address,account);
            setIsApprove(isApproveForAll);
           }, [nftcontract,nftpoolAddress,account]);

    useEffect(() => {
        if (nftcontract && nftpoolAddress && account) {
            fetchnftIsApprove();
        }
        let refreshInterval = setInterval(fetchnftIsApprove, 10000);
        return () => clearInterval(refreshInterval);
    }, [nftcontract, nftpoolAddress, setIsApprove, account,refresh]);

    return isApprove ;


};

export default useGetIsApprovedForAll;