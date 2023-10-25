import React, { useState, useEffect } from 'react';
import cls from 'classnames';
import { PREFIXClS } from './common';

import Nftimgdef  from '../assets/images/nft-unknown.png';
export type ValueType = string;

export interface CheckboOptionType {
  label: string;
  value: ValueType;
  disabled?: boolean;
  nftname?:string;
  nftimg?:string;
}

export interface BasicCheckboxProps<T> {
  prefix?: string;
  className?: string;
  defaultChecked?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (e: T) => void;
  value?: ValueType;
  partial?: boolean; // 是否为半选状态
  nftname?:string;
  nftimg?:string;
}

export interface CheckboxChangeEventTarget extends BasicCheckboxProps<CheckboxChangeEvent> {
  checked: boolean;
  value?: ValueType;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

const Checkbox: React.FC<BasicCheckboxProps<CheckboxChangeEvent>> = (props) => {
  const {
    children, disabled, required, checked = false, onClick, onChange,
    className, defaultChecked = false,
    value, prefix = PREFIXClS, partial= false,nftname,nftimg
  } = props;
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    setCheckboxChecked(() => 'checked' in props ? checked : defaultChecked);
  }, [checked, defaultChecked]);

  const classString = cls(`${prefix}-label`, className, {
    [`${prefix}-checked`]: checkboxChecked,
    [`${prefix}-disabled`]: disabled,
    [`${prefix}-partial`]: partial
  });

  return <label className={classString} style={{fontSize:'30px',verticalAlign: 'middle',display:'inline-block'}}>
    <span className={`${prefix}-input-box`}>
      <input style={{margin: '3px 3px 3px 8px'}}
        type='checkbox'
        checked={checkboxChecked}
        required={required}
        disabled={disabled}
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => onClick && onClick(e)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCheckboxChecked(e.target.checked);
          if (disabled) return;
          if (onChange) {
            onChange({
              target: {
                ...props,
                checked: e.target.checked,
                value: value || undefined
              },
              stopPropagation() { e.stopPropagation() },
              preventDefault() { e.preventDefault() },
              nativeEvent: e.nativeEvent as MouseEvent
            })
          }
        }}
        value={value}
      />
      <span className={`${prefix}-input-inner`}></span>
    </span>
    <span className={`${prefix}-content-box`} style={{marginLeft:'10px',marginRight:'10px'}}>
      <img src={nftimg?nftimg:Nftimgdef} style={{width:'30px',height:'30px',display:'inline-block'}} title={nftname+String(children)}></img>
    </span>
    <span className={`${prefix}-content-box` }
          style={{maxWidth:'100em',width:'80%',overflow:'hidden',wordBreak:'break-all',textOverflow: 'ellipsis',whiteSpace:'nowrap',verticalAlign:'bottom'}}>
      {(String(nftname).length>10?String(nftname).substr(0,9)+'...':nftname)+''+(String(children).length>4?String(children).substr(0,4)+'...':children)}
    </span>
  </label>
};

Checkbox.displayName = 'Checkbox';
export default Checkbox;
