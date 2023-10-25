/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { QuestionCircleOutlined } from '@ant-design/icons'
import AppBody from '../AppBody';
import Row from '../../components/Row';
// import { message, Tooltip } from 'antd';
import { message } from 'antd';
import { ButtonLight, ButtonPrimary } from '../../components/Button';
import {ExternalLink, TYPE} from '../../theme';
// import { TYPE } from '../../theme';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useActiveWeb3React } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import DepositWithDrawModal from './DepositStakedModal';
import { MinusCircle, RefreshCw } from 'react-feather';
import * as utils from '../../data/farm';
// import { useHistory, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TOKEN, TOKEN_ADDRESS } from '../../constants/farm';
// import useGetLPTokenBalance from '../../hooks/farm/useGetLPTokenBalance';
import initWeb3 from '../../hooks/init-web3';
// import {getFullDisplayBalance, getBalanceNumber} from '../../utils/web3';
import {getBalanceNumber} from '../../utils/web3';
// import useAllowanceOfMinterContract from '../../hooks/farm/useGetAllowanceOfContract';
// import useApproveOfLPToken from '../../hooks/farm/useApproveOfLPToken';
// import useStake from '../../hooks/farm/useStake';
// import useUnStake from '../../hooks/farm/useUnStake';
// import useEarning from '../../hooks/farm/useEarning';
// import useGetRewards from '../../hooks/farm/useGetRewards';

import useNFTHarvest from '../../hooks/nftpool/useNFTHarvest'
import useNFTStake from "../../hooks/nftpool/useNFTStake";
import useNFTWithdraw from "../../hooks/nftpool/useNFTWithdraw"

// import useGetStakedBalance from '../../hooks/farm/useGetStakedBalance';
// import useGetPoolInfo from '../../hooks/farm/useGetPoolInfo';
import { BigNumber } from 'bignumber.js';
import useGetDecimalsOfToken from '../../hooks/farm/useGetDecimalsOfToken';
import Value from '../../components/Value';
// import moment from 'moment-timezone';
// import getTransFee from '../../graphql/trans-fee';
// import { getTokenPrice, getPairPrice } from '../../graphql/token-price';
import { getTokenPrice } from '../../graphql/token-price';
import RulesItems from '../../components/RuleSlider';
// import getPoolData from '../../graphql/pool';
import TokenImage from '../../components/TokenImage';
import { getLocalCacheOfDogTokenInfo, setLocalCacheOfDogTokenInfo } from '../../utils/dogInfoCache';
//nftpool
import * as nftutils from '../../data/nftpool';

import useGetPoolPending from '../../hooks/nftpool/useGetPoolPending'
import useGetIsApprovedForAll from '../../hooks/nftpool/useGetIsApprovedForAll'

import useGetNftTokensIds from "../../hooks/nftpool/useGetNfttokensId";

import useGetNftSymbol from "../../hooks/nftpool/useGetNftSymbol"

import useApproveForAll from "../../hooks/nftpool/useApproveForAll"
import useUnstakeApproveForAll from "../../hooks/nftpool/useUnstakeApproveForAll";
import useGetNftMetadata from "../../hooks/nftpool/useGetNftMetadata";
// import {AutoColumn} from "../../components/Column";

const Card = styled.div`
    position: relative;
    max-width: 420px;
    width: 100%;
    border-radius: 30px;
    padding: 1.5rem;
    box-shadow: ${({ theme }) => theme.shadow2};
    background: ${({ theme }) => theme.bg1};
    margin-bottom: 1rem;
    overflow: hidden;
`;

const RowCenter = styled(Row)`
    justify-content: center;
`;

// const MoneyText = styled(TYPE.black)`
//     max-width: 17rem;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
// `;

// const BorderRow = styled(Row)`
//     flex-wrap: wrap;
//     justify-content: space-between;
//     padding: 0.8rem 0;
//     border-bottom: 1px solid ${({ theme }) => theme.borderColor3};
//
//     &.borderRow:last-child {
//         border-bottom: none;
//     }
// `;

// const SmallMoneyText = styled(TYPE.black)`
//     flex-grow: 1;
//     flex-shrink: 0;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     text-align: right;
//     max-width: 100%;
// `;


const RefreshIcon = styled(RefreshCw)`
    margin-left: 2rem;
    color: ${({ theme }) => theme.primary7};
    cursor: pointer;
    transition: transform 0.3s linear;

    &.rotate {
        transform: rotate(360deg);
    }
`;

const MinusIcon = styled(MinusCircle)`
    margin-left: 2rem;
    color: ${({ theme }) => theme.primary7};
    cursor: pointer;
`;

// const TokenIcon = styled.div<{src: string}>`
//     display: inline-block;
//     width: 2rem;
//     height: 2rem;
//     border-radius: 1rem;
//     overflow: hidden;
//     background: url(${({ src }) => src}) no-repeat;
//     background-size: 100%;
//     background-position: center;
//     margin-right: 1px;
// `;

const StyleValue = styled.div`
    display: inline-block;
    margin-left: 1rem;

    > span {
        font-size: 32px;
        color: ${({theme}) => theme.text1};
    }
`;

const StyleBalance = styled.div`
    display: inline-block;
    /* margin-left: 1rem; */
    color: ${({theme}) => theme.text4};
    > span {
        font-size: 16px;
        color: ${({theme}) => theme.text4};
    }
`;
const InfoLink = styled(ExternalLink)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bg3};
  padding: 6px 6px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
`
// const nowDate = moment().tz('Asia/Singapore');
// const today12M = nowDate.clone().startOf('day').set('hour', 12)
// const lastDay12PM = nowDate.clone().subtract(1, 'days').startOf('day').set('hour', 12);
// const beforeDay12PM = nowDate.clone().subtract(2, 'days').startOf('day').set('hour', 12);
// const startDate = nowDate.get('hours') >= 12 ? lastDay12PM : beforeDay12PM;
// const endDate = nowDate.get('hours') >= 12 ? today12M : lastDay12PM;

const BigNumerZero = new BigNumber(0);

export default function NftFarm() {
    const { type, pid, pairOrTokenAddress,wnftAddress,mussesId } = useParams<{
        type: string,
        pid: string,
        pairOrTokenAddress: string,
        wnftAddress: string,
        mussesId:string,
    }>();

    const isSingle = type === 'single';
    //页面跳转 没有nft，去购买，待添加
    // const history = useHistory()
    //多语言
    const {t} = useTranslation();

    const toggleWalletModal = useWalletModalToggle();
    const web3Provider = useActiveWeb3React();
    const { account, chainId } = web3Provider;
    const [transPendingText, setTransPendingText] = useState('');
    const [web3, setWeb3] = useState(null);
    // 代币合约
    const [contract, setContract] = useState<any>(null);
    // 挖矿合约
    // const [minerContract, setMinerContract] = useState<any>(null);

    //nft矿池合约
    const [nftpoolContract, setNftpoolContract] = useState<any>(null);
    //NFT合约 - 未质押
    const [nftContract, setNftContract] = useState<any>(null);
    //WNFT合约 - 未质押
    const [wnftContract, setWnftContract] = useState<any>(null);


    const [isDepositModal, setIsDepositModal] = useState(true);
    const [refreshBalance, setRefreshBalance] = useState(false);
    const [refreshEarning, setRefreshEarning] = useState(false);
    const [refreshnftTokensIds, setRefreshnftTokensIds] = useState(false);
    const [refreshwnftTokensIds, setRefreshwnftTokensIds] = useState(false);
    const [refreshAllowance, setRefreshAllowance] = useState(false);
    const [depositUnStakedModalVisible, setDepositUnStakedModalVisible] = useState(false);
    const [requestedApproval, setRequestedApproval] = useState(false);
    const [harvesting, setHarvesting] = useState(false);
    const pidNum = Number(pid);
    const address = account || '';
    const decimals = useGetDecimalsOfToken(contract, isSingle);
    // const [pairOrTokenInfo, setPairOrTokenInfo] = useState<any>();
    // const [poolName, setPoolName] = useState<string>('');
    // const [token0Address, setToken0Address] = useState<string>();
    // const [token1Address, setToken1Address] = useState<string>();
    const [dogPriceInfo, setDogPriceInfo] = useState<{
      price: number;
      decimals: number;
    }>(getLocalCacheOfDogTokenInfo());
    // const lpTokenBalance = useGetLPTokenBalance(
    //     contract,
    //     address,
    //     refreshBalance,
    // );
    
    // const allowance = useAllowanceOfMinterContract(
    //     contract,
    //     minerContract,
    //     address,
    //     refreshAllowance,
    // );



    // const earnings = useEarning(
    //     pidNum,
    //     minerContract,
    //     address,
    //     refreshBalance,
    //     refreshEarning,
    // );

    // const stakes = useGetStakedBalance(
    //     pidNum,
    //     minerContract,
    //     address,
    //     refreshBalance,
    // );
    //获取nft图片
    const nftMetadata =  useGetNftMetadata(nftContract);


    //查看质押是否授权
    const allowance = useGetIsApprovedForAll(nftContract,wnftContract,address,refreshAllowance);

    // const nftisApprove = useGetIsApprovedForAll(nftContract,nftpoolContract,address);
    // console.log("nftisApprove=",nftisApprove);
    //接触质押 是否授权
    const wnftisApprove = useGetIsApprovedForAll(wnftContract,nftpoolContract,address,refreshAllowance);
    // console.log("wnftisApprove=",wnftisApprove);
//当前地址持有nftid
    const nftTokensIds =  useGetNftTokensIds(nftContract,address,refreshnftTokensIds);
    // console.log("nftTokensIds==",nftTokensIds);
    //当前地址已抵押nftid
    const wnftTokensIds =  useGetNftTokensIds(wnftContract,address,refreshwnftTokensIds);
    // console.log("wnftTokensIds==",wnftTokensIds);


    const earnings = useGetPoolPending(
        nftpoolContract, pidNum,(wnftTokensIds as number[]),refreshBalance,refreshEarning);

    // console.log("refreshnftTokensIds==",refreshnftTokensIds,refreshwnftTokensIds);
    // console.log("refreshBalance==",refreshBalance);

    // poolinfo
    // const [poolInfo, setPoolInfo] = useState<any>()
    // const { fetchPoolInfo } = useGetPoolInfo(minerContract);
    // const { onApprove } = useApproveOfLPToken(contract, minerContract, address);
    //质押授权
    const { onApprove } = useApproveForAll(nftContract, wnftContract, address);
    const { onUnstakeApprove } = useUnstakeApproveForAll(wnftContract, nftpoolContract, address);



    // const { onStake } = useStake(pidNum, address, minerContract, isSingle, decimals);
    const { onStake } = useNFTStake(nftpoolContract, pidNum, address);

    const { onReward } = useNFTHarvest(nftpoolContract,pidNum,wnftTokensIds as number[], address);

    // const { onUnstake } = useUnStake(pidNum, address, minerContract, isSingle, decimals);
    const { onUnstake } = useNFTWithdraw(nftpoolContract, pidNum, address);
    // const [fee, setFee] = useState("0.00");
    // const lpFullBalance = useMemo(() => {
    //     return getBalanceNumber(lpTokenBalance, decimals);
    // }, [lpTokenBalance, decimals]);

    // const earningsBalance = useMemo(() => {
    //     return getFullDisplayBalance(earnings);
    // }, [earnings]);

    // const stakesBalance = useMemo(() => {
    //     return getBalanceNumber(stakes, decimals);
    // }, [stakes, decimals]);

    const stakes = (wnftTokensIds instanceof Array) ? new BigNumber(wnftTokensIds?.length) : BigNumerZero;
    const stakesBalance = (wnftTokensIds instanceof Array) ? wnftTokensIds?.length : 0;
    const lpTokenBalance = (nftTokensIds instanceof Array) ? nftTokensIds?.length : 0;





    // const stakesBalanceMoney = useMemo(() => {
    //   if (stakes.toNumber() && decimals && pairOrTokenInfo) {
    //     return stakes.dividedBy(new BigNumber(10).pow(decimals)).times(pairOrTokenInfo.price).toNumber();
    //   }
    //
    //   return 0;
    //
    // }, [stakes, decimals, pairOrTokenInfo])

    // approve 质押
    const handleApprove = useCallback(async () => {
        setRequestedApproval(true);
        const result = await onApprove();
        if (result.message) {
            console.error(result.message);
        }
        setRequestedApproval(false);
        setRefreshAllowance(!refreshAllowance);
    }, [onApprove, setRequestedApproval]);

    // approve 解押
    const handleNftApprove = useCallback(async () => {
        setRequestedApproval(true);
        const result = await onUnstakeApprove();
        if (result.message) {
            console.error(result.message);
        }
        setRequestedApproval(false);
        setRefreshAllowance(!refreshAllowance);
    }, [onUnstakeApprove, setRequestedApproval]);

    

    // contract init
    useEffect(() => {
        if (web3 && account && chainId) {
            // const minerContractInstance = utils.getPoolContract(chainId, web3);
            const contractInstance = utils.getStakedTokenContract(chainId, web3, TOKEN_ADDRESS[TOKEN.DOG]);
            setContract(contractInstance);
            // setMinerContract(minerContractInstance);

            const nftpoolContractInstance = nftutils.getNFTPoolContract(chainId,web3);
            setNftpoolContract(nftpoolContractInstance);
            const nftContractInstance = nftutils.getNFTContract(chainId,web3,pairOrTokenAddress);
            setNftContract(nftContractInstance);
            const wnftContractInstance = nftutils.getNFTContract(chainId,web3,wnftAddress);
            setWnftContract(wnftContractInstance);

        }
    }, [web3, account, chainId, pairOrTokenAddress,wnftAddress]);

    // web3 init
    useEffect(() => {
        if (web3Provider.library?.provider) {
            const web3 = initWeb3(web3Provider.library.provider);
            setWeb3(web3);
        }
    }, [web3Provider]);

    // async function getPoolInfo () {
    //     const poolInfo = await fetchPoolInfo(pidNum);
    //     setPoolInfo(poolInfo);
    // }
    // useEffect(() => {
    //     if(pidNum<2) {
    //         getPoolInfo();
    //     }
    // }, [minerContract ,pidNum]);

    // async function getFee(pairAddress: string) {
    //     const transFee: any = await getTransFee(pairAddress, startDate.unix(), endDate.unix());
    //     if (transFee) {
    //         setFee(transFee);
    //     }
    // }

    // useEffect(() => {
    //     if (!isSingle && pairOrTokenAddress) {
    //         getFee(pairOrTokenAddress);
    //     }
    // }, [isSingle, pairOrTokenAddress]);

    useEffect(() => {
        if (transPendingText) {
            message.loading({
                key: 'transLoading',
                content: transPendingText,
                duration: 40,
            })
        } else {
            message.destroy('transLoading');
        }
    }, [transPendingText]);

    // async function getPoolName() {
    //     const pools: any = await getPoolData();
    //     if (!pools || !pools.length) return ;
    //     let name = '';
    //     const filterFunc = (item: any) => item.id === pairOrTokenAddress;
    //     const pool: any = pools.filter(filterFunc)[0];
    //     if (pool) {
    //         if (pool.poolType === 0) {
    //             name = pool.token ? pool.token.symbol : 'UNKNOW';
    //         } else if(pool.pair){
    //             setToken0Address(pool.pair.token0.id)
    //             setToken1Address(pool.pair.token1.id)
    //             const token0 = pool.pair.token0 ? pool.pair.token0.symbol : 'UNKNOW';
    //             const token1 = pool.pair.token1 ? pool.pair.token1.symbol : 'UNKNOW';
    //             name = `${token0}/${token1}`;
    //         }
    //     }
    //     setPoolName(name || "UNKNOW");
    // }


    const poolName = useGetNftSymbol(nftContract);

    // console.log("poolName==",poolName);

    const onDespositOrWithDrawModalConfirm = function (amount: any[]) {
        setTransPendingText(t('pending_tx'));
        if (isDepositModal) {
            return onStake(amount);
            // return onStake(nftTokensIds as number[]);
        } else {
            return onUnstake(amount);
            // return onUnstake(wnftTokensIds as number[]);
        }
    };

    // async function getPrice(address: string, isLp: boolean) {
    //     const func: (address: string) => any = isLp ? getPairPrice : getTokenPrice
    //     const {price, decimals, totalSupply} = await func(address);
    //     // setPairOrTokenInfo({
    //     //     price,
    //     //     decimals,
    //     //     totalSupply,
    //     // });
    // }

    async function getDogPrice() {
      const { price, decimals } = await getTokenPrice(TOKEN_ADDRESS[TOKEN.DOG]);
      const info = {
        price,
        decimals
      }
      setLocalCacheOfDogTokenInfo(info);
      setDogPriceInfo(info);
    }

    useEffect(() => {
      const interval = setInterval(() => {
        getDogPrice();
      }, 10000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      }
    }, [])

    // const getPairOrTokenPriceFunc = useCallback(() => {
    //     if (pairOrTokenAddress) {
    //         getPrice(pairOrTokenAddress, !isSingle);
    //     }
    // }, [isSingle, pairOrTokenAddress]);

    // https://www.musse.io/#/collection/0x79fcdef22feed20eddacbb2587640e45491b757f?id=505657573356911616
    // function goToSwapOrLiquid() {
    //     if (pairOrTokenAddress) {
    //         history.push(
    //            `https://www.musse.io/#/collection/${pairOrTokenAddress}?id=505657573356911616`
    //         )
    //     }
    // }


    // useEffect(() => {
    //     getPairOrTokenPriceFunc();
    // }, [getPairOrTokenPriceFunc]);
    
    const rewardbalance = useMemo(() => {
      if (earnings.toNumber() && dogPriceInfo) {
        return earnings.dividedBy(new BigNumber(10).pow(dogPriceInfo.decimals)).times(dogPriceInfo.price).toNumber();
      }
      return 0;
    }, [earnings, dogPriceInfo]);

    // const totalAmountPrice = useMemo(() => {
    //     if (pairOrTokenInfo && pairOrTokenInfo.price && poolInfo && poolInfo.totalAmount) {
    //         const p = getFullDisplayBalance(new BigNumber(poolInfo.totalAmount).times(pairOrTokenInfo.price), pairOrTokenInfo.decimals || 18, 2);
    //         return `$${p}`;
    //     }
    //
    //     return t('untracked')
    // }, [pairOrTokenInfo, poolInfo]);

    useEffect(() => {
        if (!nftpoolContract || !address) {
            return;
        }
        nftpoolContract.events.Deposit({
            filter: {
                user: address
            }
        }, async (error: any, event: any) => {
            if (error) {
                return;
            }
            setTransPendingText('');
            setRefreshBalance(!refreshBalance);
            setRefreshnftTokensIds(!refreshnftTokensIds);
            setRefreshwnftTokensIds(!refreshwnftTokensIds);
            // update totalAmount;
            // getPoolInfo();
            // getPairOrTokenPriceFunc();
            // console.log("refreshnftTokensIds=Deposit=",refreshnftTokensIds,refreshwnftTokensIds);
        });
        nftpoolContract.events.Withdraw({
            filter: {
                user: address
            }
        }, async (error: any) => {
            if (error) {
                return;
            }
            setTransPendingText('');
            setRefreshBalance(!refreshBalance);
            setRefreshwnftTokensIds(!refreshwnftTokensIds);
            setRefreshnftTokensIds(!refreshnftTokensIds);
            // console.log("refreshnftTokensIds=Withdraw=",refreshnftTokensIds,refreshwnftTokensIds);

        });
    }, [nftpoolContract, address]);

    const stakeDisabled = new BigNumber(lpTokenBalance).eq(BigNumerZero);
    const unStakeEnable = !stakes.eq(BigNumerZero);
    return (
      <AppBody style={{ background: 'transparent', boxShadow: 'none' }}>
        <RulesItems top="20%" isLp={!isSingle} />
        {!account ? (
          <ButtonLight style={{ marginTop: '4rem' }} onClick={toggleWalletModal}>
            {t('connectWallet')}
          </ButtonLight>
        ) : (
          <>
            <Card>
              <RowCenter>
                <TYPE.black fontSize={32}>{t('pendingRewards')}</TYPE.black>
              </RowCenter>
              <RowCenter>
                <TokenImage address={TOKEN_ADDRESS[TOKEN.DOG]} />
                <StyleValue>
                  <Value value={parseFloat(getBalanceNumber(earnings, 18))} />
                </StyleValue>
              </RowCenter>
              <RowCenter>
                <StyleBalance>
                  ≈ $ <Value  value={rewardbalance} />
                </StyleBalance>
              </RowCenter>
              <RowCenter style={{ marginTop: '3rem' }}>
                <ButtonPrimary
                  disabled={earnings.eq(BigNumerZero) || harvesting}
                  onClick={async () => {
                    setHarvesting(true)
                    setTransPendingText(t('pending_tx'))
                    try {
                      await onReward()
                    } catch (e) {
                      console.log(e)
                      setTransPendingText('')
                    }
                    setHarvesting(false)
                  }}
                >
                  {t('get')}
                </ButtonPrimary>
                <RefreshIcon
                  className={refreshEarning ? 'rotate' : ''}
                  onClick={() => setRefreshEarning(!refreshEarning)}
                />
              </RowCenter>
            </Card>
            <Card>
              <RowCenter>
                <TYPE.black fontSize={32}>{isSingle ? t('tokenStaked') : `NFT ${t('staked')}`}</TYPE.black>
              </RowCenter>
              <RowCenter>
                <TYPE.black fontSize={22} fontWeight={300}>
                  {poolName}
                </TYPE.black>
              </RowCenter>
              <RowCenter>
                <StyleValue style={{ marginLeft: 0 }}>
                  <Value value={Number(stakesBalance)} decimals={0}/>
                </StyleValue>
              </RowCenter>
              {/*<RowCenter>
                <StyleBalance>
                  ≈ $ <Value  value={stakesBalanceMoney} />
                </StyleBalance>
              </RowCenter>*/}
              <RowCenter style={{ marginTop: '3rem' }}>
                {!allowance && (
                  <ButtonPrimary disabled={requestedApproval} onClick={handleApprove}>
                    {t(requestedApproval ? 'approving' : 'approve')}
                  </ButtonPrimary>
                )}
                {!!allowance && (
                  <>
                    <ButtonPrimary
                      disabled={stakeDisabled}
                      onClick={() => {
                        setIsDepositModal(true)
                        setDepositUnStakedModalVisible(true)
                      }}
                    >
                      {t(stakeDisabled ? 'insufficientBalance' : 'stake')}
                    </ButtonPrimary>

                      {!wnftisApprove && (
                          <ButtonPrimary disabled={requestedApproval} onClick={handleNftApprove}>
                              {t('unstaked')}{t(requestedApproval ? 'approving' : 'approve')}
                          </ButtonPrimary>
                      )}


                    {!!wnftisApprove && unStakeEnable && (
                      <MinusIcon
                        size={32}
                        onClick={() => {
                          setIsDepositModal(false)
                          setDepositUnStakedModalVisible(true)
                        }}
                      />
                    )}
                  </>
                )}
              </RowCenter>
                 {/*没有nft，去购买，待添加*/}
              {!!allowance && stakeDisabled && (
                <RowCenter style={{ marginTop: '0.5rem' }}>
                  {/*<LinkStyledButton onClick={goToSwapOrLiquid}>
                    {t('noTip')} {`${poolName} NFT`} ? Buy on Musse
                  </LinkStyledButton>*/}
                    <InfoLink
                        href={'https://www.musse.io/#/collection/' + pairOrTokenAddress +'?id='+ mussesId}
                        target="_blank"
                    >
                        {t('noTip')} {`${poolName} NFT`} ? Buy on Musse ↗
                    </InfoLink>
                </RowCenter>
              )}
            </Card>
            {/*{!!poolInfo && (
              <Card>
                <BorderRow className="borderRow">
                  <TYPE.black fontSize={20} fontWeight={300} style={{ paddingRight: '1rem' }}>
                    {t('amountOfStakedFunds')}
                  </TYPE.black>
                  <SmallMoneyText fontSize={20}>{totalAmountPrice}</SmallMoneyText>
                </BorderRow>
                {!isSingle ? (
                  <>
                    <BorderRow className="borderRow">
                      <Row style={{ flexDirection: 'column', flexGrow: 0, width: 'auto', alignItems: 'flex-start' }}>
                        <Tooltip placement="top" title={t('feeTip')}>
                          <TYPE.black fontSize={20} fontWeight={300} style={{ paddingRight: '1rem' }}>
                            <QuestionCircleOutlined />
                            &nbsp;{t('24hoursFee')}
                          </TYPE.black>
                          <TYPE.black fontSize={14} fontWeight={300}>
                            {startDate.format('MM.DD HH:mm')} - {endDate.format('MM.DD HH:mm')}
                          </TYPE.black>
                        </Tooltip>
                      </Row>
                      <SmallMoneyText fontSize={20}>${fee}</SmallMoneyText>
                    </BorderRow>
                     <BorderRow className="borderRow">
                                                    <TYPE.black fontSize={20} fontWeight={300}>{t('miningModulus')}</TYPE.black>
                                                    <SmallMoneyText fontSize={20}>3X</SmallMoneyText>
                                                </BorderRow>
                  </>
                ) : (
                  <BorderRow className="borderRow">
                    <TYPE.black fontSize={20} fontWeight={300} style={{ paddingRight: '1rem' }}>
                      {t('amountsOfStakedAddress')}
                    </TYPE.black>
                    <SmallMoneyText fontSize={20}>{poolInfo.totalStakedAddress}</SmallMoneyText>
                  </BorderRow>
                )}
              </Card>
            )}*/}
          </>
        )}
        <DepositWithDrawModal
          isOpen={depositUnStakedModalVisible}
          isDepositModal={isDepositModal}
          max={isDepositModal ? new BigNumber(lpTokenBalance) : stakes}
          decimals={decimals}
          onClose={() => {
            setDepositUnStakedModalVisible(false)
            setIsDepositModal(true)
          }}
          pairOrTokenName={String(poolName)}
          onConfirm={onDespositOrWithDrawModalConfirm}
          tokenids={isDepositModal ? nftTokensIds as number[] : wnftTokensIds as number[]}
          nftMetadata={nftMetadata}
          onError={() => setTransPendingText('')}
        />
      </AppBody>
    )
}