import React, {useState, useMemo, useEffect} from 'react';
import Modal from '../../components/Modal/v2';
import Row, {RowBetween} from '../../components/Row';
import { ButtonPrimary, ButtonGray } from '../../components/Button';
import { useTranslation } from 'react-i18next';
// import { Input as NumericalInput } from '../../components/NumericalInput';
import { TYPE } from '../../theme';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
// import {Checkbox} from "../../components/SearchModal/styleds";


import '../../assets/checkbox/index.less';
import Checkbox from '../../checkbox';
import useGetNftImgs from "../../hooks/use-get-nftImgs";
import useGetNftMeta from "../../hooks/use-get-nftMeta";
// import useGetNftMeta from "../../hooks/use-get-nftMeta";
// import useGetNftImgs from "../../hooks/use-get-nftImgs";

const RowCenter = styled(Row)`
    justify-content: center;
`;

const RowRight = styled(Row)`
    justify-content: flex-end;
`;

const CheckBoxWrapper = styled.div`
    width:100%;
    height:250px;
    overflow-y:auto;
    font-size:14px;
`;
// const InputPanel = styled.div<{ hideInput?: boolean }>`
//   ${({ theme }) => theme.flexColumnNoWrap}
//   position: relative;
//   border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
//   background-color: ${({ theme }) => theme.bg1};
//   border: 2px solid ${({ theme }) => theme.bg2};
//   z-index: 1;
// `
//
// const InputRow = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: center;
//   padding: 0.75rem;
// `
//
//
// const StyledBalanceMax = styled.button`
//   height: 28px;
//   background-color: ${({ theme }) => theme.primary6};
//   border: 1px solid ${({ theme }) => theme.primary6};
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//
//   font-weight: 500;
//   cursor: pointer;
//   margin-right: 0.5rem;
//   color: ${({ theme }) => theme.primaryText2};
//   :hover {
//     border: 1px solid ${({ theme }) => theme.primary2};
//   }
//   :focus {
//     border: 1px solid ${({ theme }) => theme.primary2};
//     outline: none;
//   }
//
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     margin-right: 0.5rem;
//   `};
// `
interface Props {
    isOpen: boolean;
    onClose(): void;
    max?: BigNumber;
    decimals?: number;
    isDepositModal?: boolean;
    onConfirm(value: any[]): Promise<any> | any;
    pairOrTokenName: string;
    tokenids:number[];
    nftMetadata:any;
    onError(): void;
}

export default function DepositModal(props: Props) {
    const {
        isOpen,
        onClose,
        isDepositModal,
        max = new BigNumber(0),
        // decimals = 10,
        onConfirm,
        pairOrTokenName,
        tokenids,
        nftMetadata,
        onError,
    } = props;

    const {t} = useTranslation();
    const [confirming, setConfirming] = useState(false);
    // const [inputValue, setInputValue]  = useState<number | string>('');
    const handleConfirmClick = async () => {
        if (checkList) {
            setConfirming(true);
            try {
                await onConfirm(checkList);
                onClose();
                // setInputValue('');
                setCheckList([]);
            } catch(e) {
                onError();
            }
            setConfirming(false);
        }
    }

    const maxStr = useMemo(() => {
        // round down
        // return max.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
        return max.toFixed()
    }, [max])

    // const [confirmed, setConfirmed] = useState(false)
    // 57897811492755225679390664397638815295595021179371157500211667493896306294869
    var options=[''];
    if(tokenids){
        let tokenidstring =[];
        tokenids.sort((a,b)=>a-b);
        for(let i=0;i<tokenids.length;i++){
            tokenidstring.push(String(tokenids[i]));
        }
        options= tokenidstring;
    }
    const {nftimeta} = useGetNftMeta(nftMetadata,options,isOpen);
    const nftlistData = useMemo(() => {
        if (!nftimeta) return [];
        return nftimeta;
    }, [nftimeta]);
    //
    // let nftmeta = ['https://gateway.pinata.cloud/ipfs/QmW5Y2mvU2qa5eiNmTdtERQ6a5Yve9XWzpxTTu3GL9x69T/3'];
    const{ nftimgs } = useGetNftImgs(nftlistData,isOpen);
    const nftimgdata = useMemo(() => {
        if (!nftimgs) return [];
        return nftimgs;
    }, [nftimgs]);

    // console.log(nftlistData);
    // var nftimgdata=[''];
    // console.log(nftimgdata);
    // console.log(nftMetadata);
    // console.log("8888888888==========",nftlistData);
    // const value = [''];
    const [checkAll, setCheckAll] = useState(false);
    const [checkList, setCheckList] = useState<any>([]);
    const [partial, setPartial] = useState(false);
    useEffect(() => {
        if (checkAll) {
            return setPartial(false);
        }
        setPartial(!!checkList.length);

    }, [checkAll, checkList]);

    // const isExceedLimit = !new BigNumber(inputValue || 0).isLessThanOrEqualTo(maxStr);
    // const confirmDisabled = confirming || isExceedLimit || !inputValue || new BigNumber(inputValue).eq(0);
    const confirmDisabled = confirming || checkList.length<=0 ;
    return (
      <Modal
        visible={isOpen}
        onClose={() => {
          // setInputValue('')
            setCheckList([]);
            setCheckAll(false);
          onClose()
        }}
        hideFooter
      >
        <RowCenter>
          <TYPE.black fontSize={30} fontWeight={300}>
            {isDepositModal ? t('deposit') : t('unstaked')} {pairOrTokenName}
          </TYPE.black>
        </RowCenter>
        <RowRight>
          <TYPE.black fontSize={14} fontWeight={300}>
            {t('nftavaliable')}{maxStr} NFT
          </TYPE.black>
        </RowRight>
         {/* <AutoRow justify="center" style={{ cursor: 'pointer' }} onClick={() => setConfirmed(!confirmed)}>
              <Checkbox
                  className=".understand-checkbox"
                  name="confirmed"
                  type="checkbox"
                  checked={confirmed}
                  onChange={() => setConfirmed(!confirmed)}
              />
              <TYPE.body ml="10px" fontSize="16px" color="" fontWeight={500}>
                  I understand
              </TYPE.body>
          </AutoRow>*/}

          <TYPE.black fontSize={14} >
          <Checkbox
              checked={checkAll}
              partial={partial}
              nftname={pairOrTokenName+'#'}
              onChange={(e) => {
                  setCheckAll(e.target.checked);
                  setCheckList(e.target.checked ? options : []);
              }}
              children="全选"
          />
          </TYPE.black>
          <br />
          <hr />
          <CheckBoxWrapper>
          <TYPE.black fontSize={14} >
          <Checkbox.Group
              options={options}
              value={checkList}
              nftname={pairOrTokenName+'#'}
              nftimgs={nftimgdata}
              onChange={(v) => {
                  setCheckAll(v.length === options.length)
                  setCheckList(v);
                  console.log(v);
              }}
          />
          </TYPE.black>
          </CheckBoxWrapper>
       {/* <InputPanel>
          <InputRow>
            <NumericalInput
              value={inputValue}
              className="token-amount-input"
              onUserInput={value => {
                setInputValue(value)
              }}
            />
            <StyledBalanceMax onClick={() => setInputValue(maxStr)}>MAX</StyledBalanceMax>
          </InputRow>
        </InputPanel>*/}

        <RowBetween style={{ marginTop: '2rem' }}>
          <ButtonGray
            style={{ width: '48%' }}
            onClick={() => {
              // setInputValue('')
                setCheckList([]);
                setCheckList([]);
                setCheckAll(false);
                onClose()
            }}
          >
            {t('cancel')}
          </ButtonGray>
          <ButtonPrimary style={{ width: '48%' }} disabled={confirmDisabled} onClick={handleConfirmClick}>
            {/*{t(isExceedLimit ? 'overMax' : 'confirm')}*/}
            {t( 'confirm')}
          </ButtonPrimary>
        </RowBetween>
      </Modal>
    )
}
