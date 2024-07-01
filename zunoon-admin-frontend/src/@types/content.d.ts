export interface IContent {
  type?: string;
  id?: string;
  data?: any;
  editform?: boolean;
  contentType?: string;
  handleCancel?: Function | any;
  handleClickSubmit?: (data: any) => void;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  setIsSubmiting?: Function | any;
  tags?: any;
  setTags?: (tags: any) => void;
  content?: { label: string; value: string };
  t: Function;
  selectedContent?: { value: string; label: string };
  setSelectedContent?: any;
}

export interface IBasket {
  id: string;
  name: string;
  description: string;
}

export interface IQuiz {
  register: any;
  id: string;
  index: number;
  setValue: Function;
  errors: any;
  handleDelete: Function;
  getValues: Function;
}

export type answerType = {
  answer: string;
  description: null | string;
  id: number;
  is_correct: boolean;
  link: string;
  question: number;
};

export type questionType = {
  answers: answerType[];
  deleted_at: null | string;
  description: string;
  id: number;
  link: string;
  question: string;
  quiz: string;
};

export type quizType = {
  contentType: string;
  description: string;
  id: string;
  is_primary: boolean;
  link: null | string;
  master_content: string;
  position: number;
  questions: questionType[];
  thumbnail: null | string;
  title: string;
};

export interface IFileUploadResponse {
  fileName?: string;
  fileType?: string;
  id?: string;
  url?: string;
}

export interface IFormData {
  contentType?: any;
  title?: string;
  description?: string;
  instruction?: string;
  bloomsTaxonomyLevel?: string;
  supplyContentType?: number;
  abilitycategory?: string;
  keywords?: string[];
  hasSubContent?: boolean;
  isFinalExam?:boolean;
  subContents?: any;
  file?: IFileUploadResponse;
  author?: string;
  mainTheme?: string;
  words?: string;
  year?: number | string;
  books?: string[];
  answer?: string;
  sentences?: string[];
  book1?: IFileUploadResponse | null;
  book2?: IFileUploadResponse | null;
  book3?: IFileUploadResponse | null;
}

export interface IContentType {
  file?: IFileUploadResponse | null;
  book1?: IFileUploadResponse | null;
  book2?: IFileUploadResponse | null;
  book3?: IFileUploadResponse | null;
  thumbnail: any;
  contentType: string;
  questions: string;
  id: string;
  title: string;
  type: string;
  description: string;
}
