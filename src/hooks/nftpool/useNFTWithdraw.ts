/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { withdraw } from '../../data/nftpool';

const useNFTWithdraw = (
    nftpoolContract: any,pid: number,accountaddress: string,) => {
    const handleWithdraw = useCallback(
        async (wtokenids: number[]) => {
            // console.log(wtokenids)
            const txHash = await withdraw(
                nftpoolContract,
                pid,
                wtokenids,
                accountaddress,
            );
            return txHash;
        },
        [nftpoolContract, pid, accountaddress],
    );

    return { onUnstake: handleWithdraw };
};

export default useNFTWithdraw;
