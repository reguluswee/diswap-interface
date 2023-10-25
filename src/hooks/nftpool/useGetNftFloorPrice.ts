import {useCallback} from "react";

const useGetNftFloorPrice = () => {

    // const [REQUEST_HOST,setREQUEST_HOST] = useState<string>("https://www.oklink.com");
   const fetchNftFloorPrice = useCallback(async (nftContract: any) => {
           const tokenids =[0,0];
        try {
            // var REQUEST_HOST="https://api.paths.finance/api/v2/musse/topCollections?orderField=vol&orderType=desc
            // &page=1&pageSize=3&type=0&keyWords=0x79fcdef22feed20eddacbb2587640e45491b757f&mainnet=ETHF";
            var REQUEST_HOST="";
            REQUEST_HOST = REQUEST_HOST.concat("/api/v2/musse/topCollections?orderField=vol&orderType=desc")
                .concat("&page=1&pageSize=3&type=0&mainnet=ETHF")
                .concat("&keyWords=").concat(nftContract)

            let myHeaders = new Headers()
            myHeaders.append("Accept", "application/json,text/plain,*/*");
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(REQUEST_HOST, {
                method: 'GET',
                // referrerPolicy:'no-referrer-when-downgrade',
                // referrer: "https://www.oklink.com",
                body: undefined,
                mode: "cors",
                headers: myHeaders,
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);

            if(result && result.resCode === "100" && result.data.total>0){
                // console.log(result.data.lists);
                // for(let i=0;i<result.data[0].tokenList.length;i++){
                //     tokenids.push(Number(result.data[0].tokenList[i].tokenId))
                // }
                tokenids.splice(0,2);
                tokenids.push(result.data.lists[0].floorPrice);
                tokenids.push(result.data.lists[0].id);
                // console.log("tokenids=="+tokenids);
                return tokenids
            }else{
                return tokenids;
            }

        } catch (err) {
            console.error(err);
            return tokenids;
        }
    },[]
    );

    return {fetchNftFloorPrice};

};

export default useGetNftFloorPrice;

