import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
// import { ReactComponent as ZHIcon } from '../../assets/images/zh.svg'
// import { ReactComponent as ENIcon } from '../../assets/images/en.svg'
import { ReactComponent as LangIcon } from '../../assets/images/language.svg'
import { ReactComponent as LangIconWh } from '../../assets/images/language-white.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import {useDarkModeManager} from "../../state/user/hooks";

/*const StyledZHIcon = styled(ZHIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledENIcon = styled(ENIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`*/
const StyledLangIcon = styled(LangIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`
const StyledLangWhIcon = styled(LangIconWh)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`
const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg16};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 2rem;
  right: -5rem;
  z-index: 200;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 1.75rem;
  `};
`

const MenuItem = styled.a`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
    vertical-align: middle;
  }
  z-index:200;
`


export default function LanguageMenu() {
  const { i18n } = useTranslation()
  const [darkMode] = useDarkModeManager()
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.LANGUAGES)
  const toggle = useToggleModal(ApplicationModal.LANGUAGES)
  useOnClickOutside(node, open ? toggle : undefined)

  function switchLng(value: string) {
    i18n.changeLanguage(value)
  }

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
       {/* {i18n.language === 'en-US' ? <StyledLangIcon /> : <StyledLangIcon />}*/}
        {darkMode ? <StyledLangWhIcon /> : <StyledLangIcon />}

      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuItem
            onClick={() => {
              switchLng('zh-CN')
            }}
          >
            {/*<StyledZHIcon />*/}
            中文
          </MenuItem>
          <MenuItem
            onClick={() => {
              switchLng('en-US')
            }}
          >
            {/*<StyledENIcon />*/}
            English
          </MenuItem>
          <MenuItem
              onClick={() => {
                switchLng('kr')
              }}
          >
            {/*<StyledENIcon />*/}
            한국어
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
