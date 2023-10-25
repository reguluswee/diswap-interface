import { default as  Check } from './Checkbox';
import Group from './Group';

type CheckboxProps = typeof Check & {
  Group: typeof Group;
};

const Checkbox = Check as CheckboxProps;
Checkbox.Group = Group;

export default Checkbox;
