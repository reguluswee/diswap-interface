import { useCallback } from 'react';
import { ApprovalForAll } from '../../data/nftpool';

const useApproveForAll = (
    nftContract: any,
    nftpoolAddress: any,
    accountAddress: string,
) => {
    const handleApprove = useCallback(async () => {
        if (!nftContract || !nftpoolAddress) {
            return;
        }
        try {
            const tx = await ApprovalForAll(
                nftContract,
                nftpoolAddress._address,
                accountAddress,
            );
            return tx;
        } catch (e) {
            return e;
        }
    }, [nftContract, nftpoolAddress, accountAddress]);

    return { onApprove: handleApprove };
};

export default useApproveForAll;
