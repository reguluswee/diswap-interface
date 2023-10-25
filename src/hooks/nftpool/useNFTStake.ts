/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { stake } from '../../data/nftpool';

const useNFTStake = (
    nftpoolContract: any,pid: number,accountaddress: string,) => {
    const handleStake = useCallback(
        async (tokenids: number[]) => {
            console.log(tokenids)
            const txHash = await stake(
                nftpoolContract,
                pid,
                tokenids,
                accountaddress,
            );
            return txHash;
        },
        [nftpoolContract, pid, accountaddress],
    );

    return { onStake: handleStake };
};

export default useNFTStake;
