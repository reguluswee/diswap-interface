/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { harvest } from '../../data/nftpool';

const useNFTHarvest = ( nftpoolContract: any,pid: number, wtokenids: number[],accountaddress: string,) => {
    const handleHarvest = useCallback(
        async () => {
            const txHash = await harvest(
                nftpoolContract,
                pid,
                wtokenids,
                accountaddress,
            );
            return txHash;
        },
        [nftpoolContract, pid, accountaddress, wtokenids],
    );

    return { onReward: handleHarvest };
};

export default useNFTHarvest;
