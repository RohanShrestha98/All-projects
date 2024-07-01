import Select, { MultiValue, type ActionMeta, SingleValue } from 'react-select';
import colors from 'tailwindcss/colors';
import Creatable from 'react-select/creatable';

export interface OptionType {
  value: number | string;
  label: string;
}
export interface SearchSelectProps {
  isMulti?: boolean;
  options?: OptionType[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  changeHandler?: (
    option: OptionType | null,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  changeHandlerMultiple?: (
    newValue: MultiValue<OptionType> | SingleValue<OptionType> | null,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  name?: string;
  value?: OptionType | null;
  valueMultiple?: OptionType[] | null;
  defaultValue?: OptionType;
  className?: string;
  clearable?: boolean;
  setOpen?: (open: boolean) => void;
  type?: 'field' | 'select';
  creatable?: boolean;
  createHandler?: (value: string) => void;
}

export default function SearchSelect({
  changeHandler,
  changeHandlerMultiple,
  options,
  name,
  value,
  valueMultiple,
  defaultValue,
  className = '',
  placeholder = 'Select',
  disabled = false,
  loading = false,
  clearable = false,
  setOpen,
  type = 'select',
  creatable = false,
  isMulti = false,
  createHandler = () => null,
}: SearchSelectProps) {
  const SelectComponent = creatable ? Creatable : Select;

  if (isMulti) {
    return (
      <SelectComponent
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={loading}
        options={options}
        onChange={changeHandlerMultiple}
        name={name}
        value={isMulti ? valueMultiple : value}
        isMulti={isMulti}
        defaultValue={defaultValue}
        className={className}
        isClearable={clearable}
        onMenuOpen={() => setOpen && setOpen(true)}
        onMenuClose={() => setOpen && setOpen(false)}
        onCreateOption={createHandler}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            ':hover': {
              borderColor: state.isFocused
                ? colors.blue[800]
                : type === 'select'
                  ? colors.gray[800]
                  : colors.gray[500],
              color: state.isFocused
                ? colors.blue[800]
                : type === 'select'
                  ? colors.gray[800]
                  : colors.gray[500],
              cursor: 'pointer',
            },
            borderColor: state.isFocused
              ? colors.blue[800]
              : type === 'select'
                ? colors.gray[500]
                : colors.gray[300],
            color: state.isFocused
              ? colors.blue[800]
              : type === 'select'
                ? colors.gray[500]
                : colors.gray[300],
            boxShadow: 'none',
            height: type === 'select' ? '40px' : 'auto',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? colors.blue[800] : 'white',
            color: state.isFocused ? colors.gray[100] : colors.gray[800],
            cursor: 'pointer',
            ':active': {
              backgroundColor: colors.blue[900],
            },
          }),
          placeholder: baseStyles => ({
            ...baseStyles,
            color: colors.gray[500],
            fontStyle: type === 'select' ? 'normal' : 'italic',
          }),
          indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? colors.blue[800]
              : colors.gray[300],
          }),
          clearIndicator: baseStyles => ({
            ...baseStyles,
            color: colors.gray[500],
            ':hover': {
              color: colors.blue[800],
            },
          }),
          dropdownIndicator: baseStyles => ({
            ...baseStyles,
            color: 'inherit',
            ':hover': {
              color: 'inherit',
            },
          }),
          menu: baseStyles => ({
            ...baseStyles,
            zIndex: 20,
          }),
          valueContainer: baseStyles => ({
            ...baseStyles,
            padding: '4px 10px',
          }),
        }}
      />
    );
  }
  return (
    <SelectComponent
      placeholder={placeholder}
      isDisabled={disabled}
      isLoading={loading}
      options={options}
      onChange={isMulti ? changeHandlerMultiple : changeHandler}
      name={name}
      value={isMulti ? valueMultiple : value}
      isMulti={isMulti}
      defaultValue={defaultValue}
      className={className}
      isClearable={clearable}
      onMenuOpen={() => setOpen && setOpen(true)}
      onMenuClose={() => setOpen && setOpen(false)}
      onCreateOption={createHandler}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ':hover': {
            borderColor: state.isFocused
              ? colors.blue[800]
              : type === 'select'
                ? colors.gray[800]
                : colors.gray[500],
            color: state.isFocused
              ? colors.blue[800]
              : type === 'select'
                ? colors.gray[800]
                : colors.gray[500],
            cursor: 'pointer',
          },
          borderColor: state.isFocused
            ? colors.blue[800]
            : type === 'select'
              ? colors.gray[500]
              : colors.gray[300],
          color: state.isFocused
            ? colors.blue[800]
            : type === 'select'
              ? colors.gray[500]
              : colors.gray[300],
          boxShadow: 'none',
          height: type === 'select' ? '40px' : 'auto',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? colors.blue[800] : 'white',
          color: state.isFocused ? colors.gray[100] : colors.gray[800],
          cursor: 'pointer',
          ':active': {
            backgroundColor: colors.blue[900],
          },
        }),
        placeholder: baseStyles => ({
          ...baseStyles,
          color: colors.gray[500],
          fontStyle: type === 'select' ? 'normal' : 'italic',
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? colors.blue[800]
            : colors.gray[300],
        }),
        clearIndicator: baseStyles => ({
          ...baseStyles,
          color: colors.gray[500],
          ':hover': {
            color: colors.blue[800],
          },
        }),
        dropdownIndicator: baseStyles => ({
          ...baseStyles,
          color: 'inherit',
          ':hover': {
            color: 'inherit',
          },
        }),
        menu: baseStyles => ({
          ...baseStyles,
          zIndex: 20,
        }),
        valueContainer: baseStyles => ({
          ...baseStyles,
          padding: '4px 10px',
        }),
      }}
    />
  );
}
