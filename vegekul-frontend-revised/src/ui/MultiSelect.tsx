import { TFunction } from 'i18next';
import { UseFormSetValue } from 'react-hook-form/dist/types';
import { withTranslation } from 'react-i18next';
import Select from 'react-select';

interface Props {
  options: object[];
  triggerClassName?: string;
  value?: string[];
  triggerClassNameCondition?: boolean;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  register?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any> | any;
  defaultValue?:
    | string[]
    | string
    | {
        value: string;
        label: string;
      };
  isMulti?: boolean;
  inputChangeHandler?: (value: string) => void;
  t: TFunction;
}
interface IObjectType {
  value: string;
  label: string;
}

function MultiSelect({
  placeholder,
  options,
  triggerClassNameCondition,
  name,
  disabled = false,
  setValue,
  defaultValue = [],
  isMulti = true,
  inputChangeHandler,
  t,
}: Props) {
  const changeHandler = (object: any) => {
    if (object.length > 0) {
      setValue(
        name,
        object.map((obj: IObjectType) => obj.value)
      );
    } else {
      setValue(object);
    }
  };
  return (
    <Select
      placeholder={placeholder}
      isMulti={isMulti}
      name="colors"
      options={options}
      className={`${
        triggerClassNameCondition
          ? 'w-1/2 h-1/2   p-0 m-0 border-gray-500/50 '
          : 'basic-multi-select'
      }`}
      classNamePrefix="select"
      isDisabled={disabled}
      defaultValue={
        defaultValue
          ? isMulti
            ? defaultValue &&
              Array.isArray(defaultValue) &&
              defaultValue.map((each: any) => ({
                value: each,
                label: t(each),
              }))
            : defaultValue
          : null
      }
      required
      onInputChange={inputChangeHandler!}
      onChange={changeHandler}
    />
  );
}

export default withTranslation()(MultiSelect);
