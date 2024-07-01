export interface IFilter {
  t?: Function;
  isSchoolAssignCoursePath?: boolean;
  setRemoveFilter?: Function;
  isCoursePath?: boolean;
  isUnitPath?: boolean;
  isSkillPath?: boolean;
  isIndicatorPath?: boolean;
  isLessonPath?: boolean;
  setFilteredData?: React.Dispatch<React.SetStateAction<any>>;
  setTotalPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setFilteredGrade?: React.Dispatch<React.SetStateAction<string>>;
  setFilteredCareer?: React.Dispatch<React.SetStateAction<string>>;
  setWatchValue?: any;
}

export interface IData {
  id?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
}

export interface ISearch {
  removeFilter?: boolean;
  handleSearch?: Function;
  setRemoveFilter?: Function;
  t?: Function;
  data?: {
    name: string;
    id: number | string;
    description: string;
    thumbnail: null | string;
    grade: IData;
    course: IData;
    unit: IData;
    skill: IData;
    indicator: IData;
    level: IData;
    isOptional: boolean;
    hasLevel: boolean;
  };
  editform?: boolean;
  setFilteredData?: React.Dispatch<React.SetStateAction<any>>;
  setTotalPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setFilteredGrade?: React.Dispatch<React.SetStateAction<string>>;
  setFilteredCareer?: React.Dispatch<React.SetStateAction<string>>;
  setWatchValue?: any;
}
