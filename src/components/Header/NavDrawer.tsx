import React, { useState } from 'react';
import { Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'react-feather'
import styled from 'styled-components';
import "antd/es/drawer/style/index.css";
import { useDarkModeManager } from '../../state/user/hooks';
import Logo from '../../assets/svg/logo.png';
import LogoDark from '../../assets/svg/logo_white.png';
import Row from '../Row';
import { NavLink } from 'react-router-dom'
import { ExternalLink, TYPE } from '../../theme';
// import HomeImg from '../../assets/images/nav-icon/home.png';
import SwapImg from '../../assets/images/nav-icon/swap.png';
import PoolImg from '../../assets/images/nav-icon/pool.png';
import BookImg from '../../assets/images/nav-icon/book.png';
import ChartsImg from '../../assets/images/nav-icon/charts.png';
// import LpImg from '../../assets/images/nav-icon/lp.png';
import MediumImg from '../../assets/images/nav-icon/medium.png';
import GithubImg from '../../assets/images/nav-icon/github.png';
// import PeopleImg from '../../assets/images/nav-icon/people.png';
import SafeImg from '../../assets/images/nav-icon/safe.png';
import TelegramImg from '../../assets/images/nav-icon/telegram.png';
import TwitterImg from '../../assets/images/nav-icon/twitter.png';
import LanguageImg from '../../assets/images/nav-icon/language.png';
import exchangeImg from '../../assets/images/nav-icon/exchange.png';
// import {ShoppingBag} from 'react-feather'
import Modal from '../Modal/v2';
import LanguageMenu from "../LanguageMenu/indexnew";

interface Props {
    visible: boolean;
    onClose: () => void;
}

const NavWrapper = styled(Drawer)`

    .ant-drawer-header {
        padding: 0;
    }

    .ant-drawer-content {
        background: ${({ theme }) => theme.black};
        height: 100vh;
    }

    .ant-drawer-wrapper-body {
        background: transparent;
    }

    .ant-drawer-body {
        padding: 0;
        background: transparent;
    }
`;

const LogoWrapper = styled.div`
    background: ${({ theme }) => theme.bg8};
    display: flex;
    width: 100%;
    height: 6.6rem;
    align-items: center;
    justify-content: center;
`;

const LogoImg = styled.img`
    width: 5.6rem;
    height: 3.9rem;
`;

const NavLinkWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 1.7rem;
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
    background: ${({ theme }) => theme.bg8};
`;

const LanguageThemeWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 1.7rem;
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
    background: ${({ theme }) => theme.bg12};
`;

const NavRow = styled(Row)`
    margin: 0.5rem 0;
`;

const Icon = styled.img`
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
`;

/*const ShopIcon = styled(ShoppingBag)`
    width: 1.1rem;
    height: 1.1rem;
    color: rgba(255,255,255,0.8);
    margin-right: 1rem;
`;*/

const InnerLink = styled(NavLink)`
    font-size: 1rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;
`;

const OutterLink = styled(ExternalLink)`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;
`;

const WhiteText = styled(TYPE.white)`
    cursor: pointer;
    user-select: none;
`;
/*const WhiteTextdown = styled(TYPE.blue)`
    cursor: pointer;
    user-select: none;
    background: #000000;
    margin: 0 8px;
    font-size: 0.8rem;
    font-weight: normal;
    font-stretch: normal;
    width: fit-content;
    cursor: pointer;
    color: ${({theme}) => theme.text6};
`;*/

const MoonIcon = styled(Moon)`
    color: ${({ theme }) => theme.white};
    margin-right: 0.7rem;
`;

const SunIcon = styled(Sun)`
    color: ${({ theme }) => theme.white};
    margin-right: 0.7rem;
`;

/*const CommingSoonLink = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;

    &.small {
      font-size: 0.9rem;
    }
`;*/

/*const CommingSoonButon = ({
    children,
    onClick,
    className,
}: {
    children: React.ReactNode;
    onClick?(): void;
    className?: string;
}) => {
    return (
        <CommingSoonLink className={className} onClick={onClick}>{children}</CommingSoonLink>
    )
}*/

export default function NavDrawer({
    visible,
    onClose,
}: Props) {
    const { t } = useTranslation();
    const [darkMode, toggleDarkMode] = useDarkModeManager();
    // const isEnglish = i18n.language === 'en-US';
    const [commingSoonVisible, setCommingSoonVisible] = useState(false);

    /*function switchLng() {
        i18n.changeLanguage(isEnglish ? 'zh-CN' : 'en-US');
    }*/
 /* function switchLng(lng?: string) {
    i18n.changeLanguage(lng);
  }*/

    return (
      <NavWrapper
        title={null}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={document.body}
        key="slideHeader"
      >
        <LogoWrapper>
          <InnerLink to={'/swap'}>
            <LogoImg width="5.6rem" height="3.9rem" src={darkMode ? LogoDark : Logo} alt="logo" />
          </InnerLink>
        </LogoWrapper>
       {/* <NavLinkWrapper>
          <NavRow>
            <Icon src={HomeImg} />
            <InnerLink style={{fontSize: '0.9rem'}} to={'/homepage'}>{t('homepage')}</InnerLink>
          </NavRow>
          <NavRow>
            <Icon src={LpImg} />
            <InnerLink style={{fontSize: '0.9rem'}} to={'/mining/lp'}>{t('lpmining')}</InnerLink>
             <CommingSoonButon onClick={() => {setCommingSoonVisible(true)}}>{t('lpmining')}</CommingSoonButon>
          </NavRow>
          <NavRow>
            <Icon src={PeopleImg} />
            <InnerLink style={{fontSize: '0.9rem'}} to={'/board/v2'}>{t('boardRoom')}</InnerLink>
          </NavRow>
        </NavLinkWrapper>*/}
        <NavLinkWrapper>
          <NavRow>
            <Icon src={SwapImg} />
            <InnerLink to={'/swap'}>{t('swap')}</InnerLink>
          </NavRow>
          <NavRow>
            <Icon src={PoolImg} />
            <InnerLink to={'/pool'}>{t('pool')}</InnerLink>
          </NavRow>
          {/*<NavRow>
            <ShopIcon />
            <InnerLink to={'/nftmarket'}>{t('navNftMarket')}</InnerLink>
          </NavRow>*/}
          <NavRow>
            <Icon src={exchangeImg} />
            {/*<CommingSoonButon
              onClick={() => {
                setCommingSoonVisible(true)
              }}
            >
              {t('crossChainSwap')}
            </CommingSoonButon>*/}
            <OutterLink href="https://openapi.chainge.finance/app?fromChain=BSC&toChain=ETHF&fromToken=USDT&toToken=USDT">{t('crossChainSwap')}</OutterLink>
          </NavRow>
        </NavLinkWrapper>
        <NavLinkWrapper>
          <NavRow>
            <Icon src={ChartsImg} />
            <OutterLink href="https://info.diswap.xyz/">{t('info')}</OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={BookImg} />
            <OutterLink href="https://appli.gitbook.io/diswap/">
              {t('whitepaper')}
            </OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={SafeImg} />
            <OutterLink href="https://appli.gitbook.io/diswap/">
              {t('audit')}
            </OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={TelegramImg} />
            <OutterLink href="https://t.me/diswap_community">Telegram</OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={TwitterImg} />
            <OutterLink href="https://twitter.com/diswap_global">Twitter</OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={MediumImg} />
            <OutterLink href="https://medium.com/@diswap_global">Medium</OutterLink>
          </NavRow>
          <NavRow>
            <Icon src={GithubImg} />
            <OutterLink href="https://github.com/reguluswee/diswap-interface">Github</OutterLink>
          </NavRow>
        </NavLinkWrapper>
        <LanguageThemeWrapper>
          <NavRow>
            <Icon src={LanguageImg} />
            {/*<WhiteText onClick={switchLng}>{isEnglish ? '中文1' : 'English2'}</WhiteText>*/}


              {/*<select id={`swap-nav-language`}   onChange = {e => switchLng(e.target.value)}>
                <option value={'zh-CN'} >中文</option>
                <option value={'en-US'} >English</option>
                <option value={'kr'} >한국어</option>
              </select>*/}
              <LanguageMenu />




          </NavRow>
          <NavRow onClick={toggleDarkMode}>
            {darkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            <WhiteText>{darkMode ? t('nightMode') : t('dayMode')}</WhiteText>
          </NavRow>
        </LanguageThemeWrapper>
        <Modal
          visible={commingSoonVisible}
          title={t('tips')}
          onClose={() => {
            setCommingSoonVisible(false)
          }}
        >
          <TYPE.black fontSize={25} textAlign="center">
            {t('commingSoon')}
          </TYPE.black>
        </Modal>
      </NavWrapper>
    )
}
