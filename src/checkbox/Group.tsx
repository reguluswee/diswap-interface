import React, { useMemo, useState, useEffect } from 'react';
import Checkbox, { CheckboOptionType, ValueType, CheckboxChangeEvent } from './Checkbox';

export interface GroupProps {
  options: Array<CheckboOptionType | string>;
  disabled?: boolean;
  onChange?: (value: Array<string>) => void;
  value?: Array<ValueType>;
  nftname?:string;
  nftimgs?:string[];
}

const Group: React.FC<GroupProps> = ({
  options, disabled, onChange, value,nftimgs = [],nftname
}) => {
  const [checkOptions, setCheckOptions] = useState([] as Array<ValueType>);

  useEffect(() => {
    if (value && options.length) {
      const valOptions = initialOptions().map(o => o.value);
      const flagVal = (value.map(itemVal => valOptions.find(groupVal => groupVal === itemVal)) as Array<string | undefined>).filter(Boolean) as Array<string>;
      setCheckOptions(flagVal);
    }
  }, [options, value]);

  const initialOptions = (): Array<CheckboOptionType> => options.map((o,index) => {
    if (typeof o !== 'string') return o;
    return { label: o, value: o }
  });

  const handleChange = (e: CheckboxChangeEvent) => {
    const { checked: checkboxChecked, value: checkboxValue } = e.target;
    if (!checkboxValue) {
      throw new Error('Expectation parameter does not exist');
    }
    const opts = [...checkOptions];
    if (checkboxChecked) {
      opts.push(checkboxValue);
    } else {
      const index = opts.findIndex(o => o === checkboxValue);
      opts.splice(index, 1);
    }
    setCheckOptions(opts.filter(Boolean));
    onChange && onChange(opts);
  };

  const optionsNode = useMemo(() => {
    return initialOptions().map((o, index) => <Checkbox
      key={`${o.value}-${index}`}
      value={o.value}
      nftname={nftname || o.nftname}
      nftimg={nftimgs[index]||o.nftimg}
      disabled={disabled || o.disabled}
      checked={!!checkOptions.find(v => v === o.value)}
      onChange={handleChange}
    >
      {o.label}
    </Checkbox>

    )
  }, [options, checkOptions]);

  return <React.Fragment>
    {optionsNode}
  </React.Fragment>;
};

Group.displayName = 'Group';
export default Group; 