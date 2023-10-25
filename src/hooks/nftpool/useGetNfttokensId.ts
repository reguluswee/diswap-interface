import {useEffect,  useState} from "react";
const OKLINK_ACCESS_KEY: string | undefined = process.env.REACT_APP_OKLINK_ACCESS_KEY


const useGetNftTokensIds = (nftContract: any,accountAddress:string, refreshBalance: boolean,) => {

    const [nftTokensIds, setNftTokensIds] = useState<number[]>();
    // const intervalRef =  useRef<any>();
    async function getTokensIdsInitData() {
        try {
            var REQUEST_HOST="";
            REQUEST_HOST = REQUEST_HOST.concat("/api/v5/explorer/address/address-balance-fills?chainShortName=ethf")
                .concat("&address=").concat(accountAddress.toLowerCase())
                .concat("&protocolType=token_721")
                .concat("&tokenContractAddress=").concat(nftContract._address.toLowerCase())
                .concat("&limit=50");

            let myHeaders = new Headers()
            myHeaders.append("Accept", "application/json,text/plain,*/*");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Ok-Access-Key",String(OKLINK_ACCESS_KEY));


            const response = await fetch(REQUEST_HOST, {
                method: 'GET',
                // referrerPolicy:'no-referrer-when-downgrade',
                // referrer: "https://www.oklink.com",
                body: undefined,
                mode: "cors",
                headers: myHeaders,
            });

            if (!response.ok) {
                console.error("response", response.headers.get("Ok-Access-Key"),response.headers.get("Accept"));
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            if(result && result.code === "0"){
                let tokenids =[];
                for(let i=0;i<result.data[0].tokenList.length;i++){
                    tokenids.push(Number(result.data[0].tokenList[i].tokenId))
                }
                setNftTokensIds(tokenids);
            }else{
                setNftTokensIds(undefined);
            }
        } catch (err) {
            console.error(err);
        }
    }
  /*  async function getNFTInitData() {
        try {
            // var REQUEST_HOST="https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=北京";
            // var REQUEST_HOST_URL="www.oklink.com";
            // var REQUEST_HOST="https://www.oklink.com";
            var REQUEST_HOST="";
            REQUEST_HOST = REQUEST_HOST.concat("/api/v5/explorer/token/token-list?chainShortName=ETHF")
                .concat("&protocolType=token_721")
                .concat("&tokenContractAddress=").concat(nftContract._address.toLowerCase())
                .concat("&limit=50");
            // REQUEST_HOST = REQUEST_HOST.concat("/api/v5/explorer/blockchain/summary")

            let myHeaders = new Headers()
            myHeaders.append("Accept", "application/json,text/plain,*!/!*");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Ok-Access-Key",String(OKLINK_ACCESS_KEY));


            const response = await fetch(REQUEST_HOST, {
                method: 'GET',
                // referrerPolicy:'no-referrer-when-downgrade',
                // referrer: "https://www.oklink.com",
                body: undefined,
                mode: "cors",
                headers: myHeaders,
            });

            if (!response.ok) {
                console.error("response", response.headers.get("Ok-Access-Key"),response.headers.get("Accept"));
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            // if(result && result.code === "0"){
            //     let tokenids =[];
            //     for(let i=0;i<result.data[0].tokenList.length;i++){
            //         tokenids.push(Number(result.data[0].tokenList[i].tokenId))
            //     }
            //     setNftTokensIds(tokenids);
            // }else{
            //     setNftTokensIds(undefined);
            // }
        } catch (err) {
            console.error(err);
        }
    }*/
    useEffect(() => {
        if(nftContract && accountAddress){
            getTokensIdsInitData();
            // if (!intervalRef.current) {
            //     intervalRef.current = setInterval(getTokensIdsInitData, 5000);
            // }
        }
        // return () => {
        //     if (intervalRef) {
        //         clearInterval(intervalRef.current);
        //     }
        // }
    },[nftContract,accountAddress,refreshBalance]);

    return nftTokensIds;
};

export default useGetNftTokensIds;

