import {useCallback, useEffect, useRef, useState} from 'react';
import {getpoolPending} from '../../data/nftpool';
import BigNumber from "bignumber.js";

const useGetPoolPending = (
    poolcontract:any,
    pid: number,
    wnftTokenids:number[],refreshBalance: boolean,clickRefresh: boolean,
)=>{
    const [balance, setBalance] = useState(new BigNumber(0));
    const intervalRef =  useRef<any>();

    const fetchBalance = useCallback(async () =>{
        const pengding = await getpoolPending(poolcontract,pid,wnftTokenids)
        setBalance(new BigNumber(pengding[0]));
    }, [poolcontract,pid,wnftTokenids]);

    useEffect(() => {
        if (poolcontract && pid && wnftTokenids && wnftTokenids.length>0) {
            fetchBalance();
            if (!intervalRef.current) {
                intervalRef.current = setInterval(fetchBalance, 5000);
            }
        }else{
            setBalance(new BigNumber(0));
        }

        return () => {
            if (intervalRef) {
                clearInterval(intervalRef.current);
            }
        }
    }, [
        poolcontract,
        pid,
        setBalance,
        wnftTokenids,
        refreshBalance,clickRefresh
    ]);

    return balance ;

};

export default useGetPoolPending;