import { optionType } from "./option";

export interface ITagsSelect {
  id?: string;
  name?: string;
  label?: string;
  options?: any[];
  value?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  register: any;
  tags: any;
  setTags: any;
  handleChange?: (e: Event, data: any) => any;
  isSubmitted?: boolean;
}

export interface ISelect {
  id?: string;
  name?: string;
  label?: string;
  options?: optionType[];
  value?: optionType | string | undefined;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: any;
  isOptional?: boolean;
  isMulti?: boolean;
  haslevel?: boolean;
  isContentForm?: boolean;
  handleChange?: (e: Event, data: any) => any;
  defaultValue?: any;
  clearable?:boolean;
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
}

export interface IInfiniteScrollSelect {
  id?: string;
  submitButtonClick?: boolean;
  name?: string;
  label?: string;
  loadOptions?: any;
  value?: optionType[] | string | undefined;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: any;
  isOptional?: boolean;
  haslevel?: boolean;
  handleChange?: (e: Event, data: any) => any;
  defaultValue?: any;
  isMulti?: boolean;
  isDisabled?: boolean;
}
