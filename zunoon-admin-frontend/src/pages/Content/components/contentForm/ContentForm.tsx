import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import Textarea from "../../../../components/Textarea/Textarea";
import capitalizeFirstLetter from "../../../../utils/capitalizeFirstLetter";
import http from "../../../../utils/http";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import config from "../../../../config";
import CustomCreatableSelect from "../../../../components/CustomSelect/CustomCreatableSelect";
import { withTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { IContent, IFileUploadResponse, IFormData } from "../../../../@types/content";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";
import { optionType } from "../../../../@types/option";
import { RiArrowDropDownLine } from "react-icons/ri";
import useHandleClickOutside from "../../../../hooks/useHandleClickOutside";
import "./ContentForm.scss";
import "./quizContentForm.scss";
import { PATH } from "../../../../constants/routes";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import toast from "../../../../utils/toast";
import Loader from "../../../../components/Loader/Loader";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import GenerateListOptions from "../../../School/components/schoolForm/SelectOptions";

const contentApi = config.endpoints.api.content;
const fileUploadApi = config.endpoints.api.file;
const basketApi = config.endpoints.api.basket;

const ContentForm = ({
  id,
  data,
  editform = false,
  contentType: cntType,
  handleCancel,
  handleClickUpdate,
  isSubmitting,
  selectedContent,
  setSelectedContent,
  content,
  t,
}: IContent) => {
  const [contentType, setContentType] = useState<optionType | null>();
  const [capitalContent, setCapitalContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [tags, setTags] = useState<any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { supplyContentTypeOptions } = GenerateListOptions();

  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, { toggle: () => setDropdownOpen(false) });

  const [ability, setAbility] = useState<optionType[]>();
  const [selectedAbility, setSelectedAbility] = useState<any>();
  const [keyWords, setKeyWords] = useState<any>([]);
  const [subContents, setSubContents] = useState<any>([]);
  const [hasSubContent, setHasSubContent] = useState(
    editform ? (data.hasSubContent ? true : false) : false,
  );
  const [selectedSubContents, setSelectedSubContents] = useState([]);
  const [supplyContentType, setSupplyContentType] = useState<optionType[] | null>(
    supplyContentTypeOptions.map(item => {
      return { label: item.label, value: item.value };
    }),
  );

  const [selectedSupplyContentType, setSelectedSupplyContentType] = useState<optionType | null>();

  const [basketList, setBasketList] = useState([]);
  const [filteredBasket, setFilteredBasket] = useState([]);
  const [basketSearchTerm, setBasketSearchTerm] = useState<string | null>();
  const [selectedBasket, setSelectedBasket] = useState("");

  const [taxonomy, setTaxonomy] = useState<optionType[]>([]);
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<optionType | null>();

  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const [responseMediaFile, setResponseMediaFile] = useState<IFileUploadResponse>(data?.file);

  const [isBookLevel1Uploading, setIsBookLevel1Uploading] = useState<boolean>(false);
  const [isBookLevel2Uploading, setIsBookLevel2Uploading] = useState<boolean>(false);
  const [isBookLevel3Uploading, setIsBookLevel3Uploading] = useState<boolean>(false);

  const [responseBookLevel1File, setResponseBookLevel1File] = useState<IFileUploadResponse>(
    data?.book1,
  );
  const [responseBookLevel2File, setResponseBookLevel2File] = useState<IFileUploadResponse>(
    data?.book2,
  );
  const [responseBookLevel3File, setResponseBookLevel3File] = useState<IFileUploadResponse>(
    data?.book3,
  );

  // useEffect(() => {
  //   if(!capitalContent){
  //     setCapitalContent("Video")
  //   }
  // }, [capitalContent])

  useEffect(() => {
    if (editform) {
      setContentType(() => {
        return { label: data?.contentType, value: data?.contentType?.toLowerCase() };
      });
    } else {
      setContentType(() => {
        return { label: content?.label, value: content?.value };
      });
    }
  }, [content]);

  useEffect(() => {
    if (editform) {
      setCapitalContent(capitalizeFirstLetter(data?.contentType?.toLowerCase()));
    } else {
      setCapitalContent(capitalizeFirstLetter(content?.value));
    }
  }, [contentType, data?.contentType, editform]);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm(
    editform
      ? {
        defaultValues: data
          ? {
            id: data.id,
            masterContent: data.masterContent,
            title: data.title,
            thumbnail: data.thumbnail,
            taxonomy: data.taxonomy,
            words: tags && tags,
            books: tags && tags,
            sentences: tags && tags,
            description: data.description,
            link: data.link,
            file: data.file,
            instruction: data.instruction,
            contentType: data.contentType,
            author: data.author,
            mainTheme: data.mainTheme,
            year: data.year,
            url: data.url,
            answer: data.answer,
            abilityCategory: data.abilityCategory,
            keyWords: keyWords && keyWords,
            hasSubContent: data.hasSubContent,
            subContents: data.subContents,
            supplyContentType: data.supplyContentType,
          }
          : undefined,
      }
      : {
        defaultValues: {
          masterContent: id,
          contentType: contentType,
        },
      },
  );

  const defaultSubContents = [];
  data?.subContents?.map(item => {
    return defaultSubContents.push({
      label: item?.title,
      value: item?.id,
    });
  });

  const handleReset = () => {
    reset({
      link: "",
      file: null,
      title: "",
      instruction: "",
      words: [],
      books: [],
      sentences: [],
      thumbnail: "",
      description: "",
      masterContent: id,
      contentType: contentType,
      author: "",
      mainTheme: "",
      year: "",
      url: "",
      answer: "",
      subContents: [],
    });
  };

  const handleClear = () => {
    handleReset();
    setKeyWords([]);
    setSelectedSupplyContentType(null);
    setSelectedTaxonomy(null);
    setSelectedAbility(null);
    setHasSubContent(false);
    selectedContent?.value === "audio" ||
      selectedContent?.value === "video" ||
      selectedContent?.value === "image"
      ? setResponseMediaFile(null)
      : selectedContent?.value === "book"
        ? (setResponseBookLevel1File(null),
          setResponseBookLevel2File(null),
          setResponseBookLevel2File(null))
        : null;
  };

  useEffect(() => {
    const getData = async () => {
      const taxonomyResponse = await http.GET(contentApi.bloomList, "");
      const abilityCategoryResponse = await http.GET(contentApi.abilityList, "");

      const taxonomyOptions = convertToOptions(taxonomyResponse.data.data);
      const abilityOptions = abilityCategoryResponse?.data?.data?.map(ability => {
        return { value: ability.id, label: ability.type };
      });

      setTaxonomy(taxonomyOptions);
      setAbility(abilityOptions);
    };

    getData();
  }, []);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const abilityCategoryResponse = await http.GET(`${contentApi.abilityList}?page=${page}`, "");

    if (!abilityCategoryResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }

    const abilityOptions =
      abilityCategoryResponse.data.data?.map(ability => ({
        value: ability.id,
        label: ability.type,
      })) || [];

    const filteredOptions = searchQuery
      ? abilityOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : abilityOptions;

    const hasMore =
      abilityCategoryResponse.data.totalPage > abilityCategoryResponse.data.currentPage;

    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  useEffect(() => {
    if (editform && taxonomy?.length) {
      const selectedTaxonomy = taxonomy.find(each => each.value === data.bloomsTaxonomyLevelID);
      setSelectedTaxonomy(selectedTaxonomy);
    }
    if (editform && ability?.length) {
      const selectedAbility = ability.find(each => each.value === data.abilityCategory);
      setSelectedAbility(selectedAbility);
    }
    if (editform && supplyContentType?.length) {
      const selectedSupplyContentType = supplyContentType.find(
        each => each.value == data.supplyContentType,
      );
      setSelectedSupplyContentType(selectedSupplyContentType);
    }
    if (editform && data.subContents?.length) {
      setSelectedSubContents(
        data?.subContents?.map(item => {
          return { value: item.id, label: item.title };
        }),
      );
    }
  }, [editform, data, ability, taxonomy]);

  useEffect(() => {
    if (editform) {
      if (data && data.words && data?.words?.length) {
        setTags(data.words.map(word => word.word));
      }
      if (data && data.books && data?.books?.length) {
        setTags(data.books.map(book => book.book));
      }
      if (data && data.sentences && data?.sentences?.length) {
        setTags(data.sentences.map(sentence => sentence.sentence));
      }
      if (data?.keywords?.length) {
        setKeyWords(data.keywords.map(word => word));
      }
    }
  }, [data, editform, setTags]);

  const handleMediaFileChange = async (e, capitalContent: string) => {
    setIsFileUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "content",
        type: fileType,
        file: file,
      });
      if (response.status === 200) {
        setIsFileUploading(false);
        setResponseMediaFile(response?.data?.data);
      } else {
        toast.error(new Error(`${t("error_in")} ${t("uploading")} ${capitalContent}`));
        setIsFileUploading(false);
      }
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsFileUploading(false);
    }
  };

  const bookLevels = [
    { label: `${capitalContent} ${t("level 1")}`, name: "book1" },
    { label: `${capitalContent} ${t("level 2")}`, name: "book2" },
    { label: `${capitalContent} ${t("level 3")}`, name: "book3" },
  ];

  const handleBookLevelChange = async (e, levelName) => {
    const file = e.target.files[0];
    levelName === "book1"
      ? setIsBookLevel1Uploading(true)
      : levelName === "book2"
        ? setIsBookLevel2Uploading(true)
        : levelName === "book3"
          ? setIsBookLevel3Uploading(true)
          : null;
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "content",
        type: "book",
        file: file,
      });
      switch (levelName) {
        case "book1":
          setResponseBookLevel1File(response?.data?.data);
          setIsBookLevel1Uploading(false);
          break;
        case "book2":
          setResponseBookLevel2File(response?.data?.data);
          setIsBookLevel2Uploading(false);
          break;
        case "book3":
          setResponseBookLevel3File(response?.data?.data);
          setIsBookLevel3Uploading(false);
          break;
        default:
          setIsBookLevel1Uploading(false);
          setIsBookLevel2Uploading(false);
          setIsBookLevel3Uploading(false);
          break;
      }
    } catch (err) {
      toast.error(err?.toString());
      setIsBookLevel1Uploading(false);
      setIsBookLevel2Uploading(false);
      setIsBookLevel3Uploading(false);
    }
  };

  const handleAbilitySelectChange = (data, e) => {
    setSelectedAbility(data);
    setValue("abilityCategory", data?.value);
  };

  const handleSupplyContentTypeSelectChange = (data, e) => {
    setSelectedSupplyContentType(data);
    setValue("supplyContentType", data?.value, { shouldDirty: true });
  };

  const videoContentFields = ["video", "image", "audio", "supportfile", "weblink", "shortmaterial"];
  const wordsField = ["anagram", "lettersoup"];

  const navigate = useNavigate();

  const handleClickSubmit = (data: any) => {
    const subContentIds = [];
    subContents?.map((item: any) => {
      return subContentIds.push(item.value);
    });
    const formData: IFormData = {
      contentType: contentType?.value,
      title: data?.title,
      description: data?.description,
      instruction: data?.instruction,
      bloomsTaxonomyLevel: data?.taxonomy,
      supplyContentType: parseInt(data?.supplyContentType),
      abilitycategory: data?.abilityCategory,
      keywords: keyWords,
      // isFinalExam: isFinalExam,
      hasSubContent: hasSubContent,
      subContents: subContentIds,
      file: responseMediaFile,
    };

    (contentType?.value === "audio" || contentType?.value === "book") &&
      (formData.author = data?.author);
    contentType?.value === "audio" && (formData.mainTheme = data?.mainTheme);
    (contentType?.value === "anagram" || contentType?.value === "letterSoup") &&
      (formData.words = data?.words);
    contentType?.value === "book" && (formData.year = data?.year);
    contentType?.value === "book" && (formData.book1 = responseBookLevel1File);
    contentType?.value === "book" && (formData.book2 = responseBookLevel2File);
    contentType?.value === "book" && (formData.book3 = responseBookLevel3File);
    contentType?.value === "book" && (formData.books = data?.books);
    contentType?.value === "dicted" && (formData.answer = data?.answer);
    contentType?.value === "letterSoup" && (formData.answer = data?.answer);
    contentType?.value === "conceptOrder" && (formData.sentences = data?.sentences);

    {
      editform
        ? http
          .PATCH(contentApi.update(data.id), formData)
          .then(() => {
            toast.success(`${t("th_content")} ${t("updated_successfully")}`);
            navigate(PATH.CONTENT);
          })
          .catch(err => {
            toast?.error(err);
          })
          .finally(() => {
            // setIsSubmiting(false);
          })
        : http
          .POST(contentApi.create, formData)
          .then(() => {
            toast.success(t("content_added_successfully"));
            navigate(PATH.CONTENT);
          })
          .catch(err => {
            toast.error(Object.values(err?.response?.data?.errors)?.[0]);
          });
    }
  };

  const handleSubContentsMultiSelect = value => {
    setSelectedSubContents(value);
    const subContentsIds = value.map(item => item?.value);
    setValue("subContents", subContentsIds);
  };

  useEffect(() => {
    const getBasketData = async () => {
      try {
        const response = await http.GET(basketApi.list, "");
        setBasketList(response?.data?.data);
        setFilteredBasket(response?.data?.data);
      } catch (error) {
        toast.error(error.toString());
      }
    };
    if (dropdownOpen) {
      getBasketData();
    }
  }, [dropdownOpen]);

  const handleBasketSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === null) {
      const searchData = basketList;
      setBasketList([...searchData]);
    } else {
      const searchData = filteredBasket.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setBasketList(searchData);
    }
    setBasketSearchTerm(value);
  };

  const handleBasketContentFetch = async (id: string) => {
    try {
      const response = await http.GET(basketApi.details(id), "");
      const subContentsOptions = response.data.data.contents.map(item => {
        return { value: item.id, label: item.name };
      });
      setSubContents(subContentsOptions);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <form className="content-form-container mw-100" onSubmit={handleSubmit(handleClickSubmit)}>
      <div className="basic_form_container">
        <h1>{t("basic_information")}</h1>
        <div className="basic_title_field">
          <div className="row-container">
            <div className="fieldAndValidate">
              <InputField
                required
                autoFocus={true}
                type="text"
                label={`${capitalContent} ${t("title")}`}
                placeholder={t("placeholder_content_title")}
                {...register("title", {
                  required: true,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
                watchValue={watch("title")}
              />
              {errors?.title?.type === "required" && (
                <p className="required">{t("field_required")}</p>
              )}
            </div>
          </div>
          <div className="row-container">
            <div className="fieldAndValidate">
              <InfiniteScrollSelect
                id="abilityCategory"
                required={true}
                register={register}
                placeholder={`${t("select")} ${t("sidebar_ability_category")}`}
                name="abilityCategory"
                label={t("sidebar_ability_category")}
                value={selectedAbility}
                handleChange={(e, data) => {
                  handleAbilitySelectChange(e, data);
                }}
                loadOptions={loadOptions}
                disabled={false}
              />
              {errors?.abilityCategory?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
        </div>
        <div className="basic_title_field">
          <div className="row-container">
            <div className="fieldAndValidate">
              <CustomCreatableSelect
                required={true}
                id="keywords"
                register={register}
                name={t("keywords")}
                label={t("keywords")}
                tags={keyWords}
                setTags={setKeyWords}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
          <div className="row-container">
            <div className="fieldAndValidate">
              <CustomSelect
                id="supplyContentType"
                required={true}
                register={register}
                name="supplyContentType"
                label={t("supply_content_type")}
                placeholder={`${t("select")} ${t("supply_content_type")}`}
                value={selectedSupplyContentType}
                handleChange={(e, data) => {
                  handleSupplyContentTypeSelectChange(e, data);
                }}
                options={supplyContentType}
                disabled={false}
              />
              {errors?.supplyContentType?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
        </div>
        <div className="basic_title_field">
          <div className="row-container">
            <div className="fieldAndValidate">
              <Textarea
                required
                label={t("th_description")}
                rows={5}
                placeholder={t("placeholder_content_description")}
                {...register("description", {
                  required: true,
                })}
                onChange={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
                watchValue={watch("description")}
              />
              {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>

          <div className="row-container">
            <div className="fieldAndValidate">
              <Textarea
                required
                label={t("instruction")}
                rows={5}
                placeholder={t("placeholder_instruction")}
                {...register("instruction", {
                  required: true,
                })}
                onChange={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
                watchValue={watch("instruction")}
              />
              {errors?.instruction?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="basic_form_container content_detail_information">
        <h1>
          {capitalContent} {t("detail_information")}
        </h1>
        {(videoContentFields?.includes(capitalContent && capitalContent?.toLowerCase()) ||
          capitalContent === "image") && (
            <>
              <div className="basic_title_field">
                <div className="row-container">
                  <div className="fieldAndValidate">
                    <label htmlFor="file" className="labelICon">
                      {capitalContent} {t("link")} <span>*</span>
                    </label>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "8px" }}
                    >
                      <input
                        type="file"
                        {...register("file")}
                        id="file-input"
                        accept={`${contentType?.value === "audio"
                          ? "audio/*"
                          : contentType?.value === "image"
                            ? "image/*"
                            : contentType?.value === "video"
                              ? "video/*"
                              : ""
                          }`}
                        onChange={e => handleMediaFileChange(e, capitalContent)}
                        style={{ width: "220px" }}
                      />
                      <label id="file-input-label" htmlFor="file-input">
                        {responseMediaFile?.fileName
                          ? `${t("change")} ${capitalContent}`
                          : `${t("select")} ${capitalContent}`}
                      </label>
                      <span>
                        {!isFileUploading && (
                          <Link to={responseMediaFile?.url} target="_blank">
                            {responseMediaFile?.fileName}
                          </Link>
                        )}
                      </span>
                      {isFileUploading && <Loader size={20} />}
                      {responseMediaFile?.url && !isFileUploading && (
                        <div
                          className="cross_btn"
                          onClick={() => {
                            setResponseMediaFile({});
                          }}
                        >
                          <RxCross2 size={20} className="file_cross_icon" />
                        </div>
                      )}
                      {errors?.file?.type === "required" && <p>{t("field_required")}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic_title_field">
                {capitalContent && capitalContent?.toLowerCase() === "audio" && (
                  <>
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <InputField
                          type="text"
                          label={t("author")}
                          placeholder={t("placeholder_author")}
                          {...register("author", {
                            required: false,
                          })}
                          onKeyUp={e => {
                            e.target.value = e?.target?.value?.trimStart();
                          }}
                          watchValue={watch("author")}
                        />
                      </div>
                    </div>
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <InputField
                          required
                          type="text"
                          label={t("main_theme")}
                          placeholder={t("placeholder_main_theme")}
                          {...register("mainTheme", {
                            required: true,
                          })}
                          onKeyUp={e => {
                            e.target.value = e?.target?.value?.trimStart();
                          }}
                          watchValue={watch("mainTheme")}
                        />
                        {errors?.link?.type === "required" && <p>{t("field_required")}</p>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        {capitalContent && capitalContent?.toLowerCase() === "book" && (
          <>
            <div className="basic_title_field">
              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    required
                    type="text"
                    label={t("author")}
                    placeholder={t("placeholder_author")}
                    {...register("author", {
                      required: true,
                    })}
                    onKeyUp={e => {
                      e.target.value = e?.target?.value?.trimStart();
                    }}
                  />
                  {errors?.author?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    required
                    type="number"
                    min={1600}
                    max={new Date().getFullYear()}
                    label={t("year")}
                    placeholder={t("placeholder_year")}
                    {...register("year", {
                      required: true,
                    })}
                    onKeyUp={e => {
                      e.target.value = e?.target?.value?.trimStart();
                    }}
                  />
                  {errors?.year?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
            </div>
            <div className="basic_title_field">
              <div className="row-container">
                {bookLevels?.map((item, id) => {
                  const inputId = `file-input${id + 1}`;
                  const labelId = `file-input-label${id + 1}`;

                  return (
                    <div className="fieldAndValidate" key={id}>
                      <label htmlFor={inputId} className="labelCon">
                        {item?.label}
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          paddingTop: "8px",
                        }}
                      >
                        <input
                          type="file"
                          id={inputId}
                          //@ts-ignore
                          {...register(item.name)}
                          accept="pdf/*"
                          onChange={e => handleBookLevelChange(e, item.name)}
                          style={{ width: "220px" }}
                        />
                        <label id={labelId} htmlFor={inputId}>
                          {item.name === "book1"
                            ? responseBookLevel1File?.fileName
                              ? `Change ${capitalContent} 1`
                              : `Select ${capitalContent} 1`
                            : item.name === "book2"
                              ? responseBookLevel2File?.fileName
                                ? `Change ${capitalContent} 2`
                                : `Select ${capitalContent} 2`
                              : item.name === "book3"
                                ? responseBookLevel3File?.fileName
                                  ? `Change ${capitalContent} 3`
                                  : `Select ${capitalContent} 3`
                                : ""}
                        </label>

                        {item.name === "book1" && isBookLevel1Uploading && <Loader size={20} />}
                        {item.name === "book2" && isBookLevel2Uploading && <Loader size={20} />}
                        {item.name === "book3" && isBookLevel3Uploading && <Loader size={20} />}
                      </div>
                      <span>
                        {item.name === "book1" && !isBookLevel1Uploading && (
                          <Link to={responseBookLevel1File?.url} target="_blank">
                            {responseBookLevel1File?.fileName}
                          </Link>
                        )}
                      </span>
                      <span>
                        {item.name === "book2" && !isBookLevel2Uploading && (
                          <Link to={responseBookLevel2File?.url} target="_blank">
                            {responseBookLevel2File?.fileName}
                          </Link>
                        )}
                      </span>
                      <span>
                        {item.name === "book3" && !isBookLevel3Uploading && (
                          <Link to={responseBookLevel3File?.url} target="_blank">
                            {responseBookLevel3File?.fileName}
                          </Link>
                        )}
                      </span>
                      {item.name === "book1" &&
                        responseBookLevel1File?.url &&
                        !isBookLevel1Uploading && (
                          <div
                            className="cross_btn"
                            onClick={() => {
                              setResponseBookLevel1File({});
                            }}
                          >
                            <RxCross2 size={20} className="file_cross_icon" />
                          </div>
                        )}
                      {item.name === "book2" &&
                        responseBookLevel2File?.url &&
                        !isBookLevel2Uploading && (
                          <div
                            className="cross_btn"
                            onClick={() => {
                              setResponseBookLevel2File({});
                            }}
                          >
                            <RxCross2 size={20} className="file_cross_icon" />
                          </div>
                        )}
                      {item.name === "book3" &&
                        responseBookLevel3File?.url &&
                        !isBookLevel3Uploading && (
                          <div
                            className="cross_btn"
                            onClick={() => {
                              setResponseBookLevel3File({});
                            }}
                          >
                            <RxCross2 size={20} className="file_cross_icon" />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {wordsField?.includes(capitalContent && capitalContent?.toLowerCase()) && (
          <div className="basic_title_field">
            <div className="fieldAndValidate">
              <label htmlFor="taxonomy" className="labelCon">
                {t("words")} <span>*</span>
              </label>
              <CustomCreatableSelect
                id="words"
                register={register}
                name="words"
                tags={tags}
                setTags={setTags}
              />
            </div>
          </div>
        )}
        {capitalContent && capitalContent?.toLowerCase() === "dicted" && (
          <div className="basic_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <InputField
                  type="link"
                  label={t("url")}
                  placeholder={t("placeholder_url")}
                  {...register("url", {
                    required: false,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.link?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
            <div className="row-container">
              <div className="fieldAndValidate">
                <InputField
                  required
                  type="text"
                  label={t("answer")}
                  placeholder={t("placeholder_content_answer")}
                  {...register("answer", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.answer?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
          </div>
        )}
        {capitalContent && capitalContent?.toLowerCase() === "conceptorder" && (
          <div className="basic_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <label htmlFor="sentences" className="labelCon">
                  {t("sentences")} <span>*</span>
                </label>
                <CustomCreatableSelect
                  id="sentences"
                  register={register}
                  name="sentences"
                  tags={tags}
                  setTags={setTags}
                />
              </div>
            </div>
          </div>
        )}
        <div className="basic_title_field">
          <div className="row-container">
            <div className="subContent_check">
              <label htmlFor="hasSubContent" className="labelCon">
                {t("has_sub_content")}?
              </label>
              <input
                checked={hasSubContent}
                type="checkbox"
                {...register("hasSubContent")}
                onChange={e => setHasSubContent(e.target.checked)}
              />
            </div>
            {hasSubContent && (
              <div className="basket_dropdown_button_wrapper" ref={wrapperRef}>
                <div
                  className="selected"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <p className="lang-text">
                    {selectedBasket ? selectedBasket : `${t("select")} ${t("basket")}`}
                  </p>

                  <RiArrowDropDownLine
                    style={
                      dropdownOpen
                        ? {
                          transform: "rotate(180deg)",
                          transition: "all 0.2s ease-in-out",
                        }
                        : { transition: "all 0.2s ease-in-out" }
                    }
                    size={28}
                  />
                </div>
                {dropdownOpen && (
                  <div className="options" style={{ zIndex: "10", width: "100%" }}>
                    <div className="option">
                      <div className="lang-text">
                        <InputField
                          type="text"
                          onChange={e => handleBasketSearch(e)}
                          value={basketSearchTerm}
                          placeholder={`${t("search")} ${t("th_basket")}`}
                          onKeyUp={e => {
                            e.target.value = e?.target?.value?.trimStart();
                          }}
                        />
                      </div>
                    </div>
                    {basketList?.map(basket => (
                      <div
                        key={basket.ID}
                        className="option"
                        onClick={() => {
                          setSelectedBasket(basket?.name);
                          handleBasketContentFetch(basket?.id);
                          setDropdownOpen(false);
                        }}
                      >
                        <p className="lang-text">{basket.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {hasSubContent && (
            <div className="row-container">
              <div className="fieldAndValidate">
                <MultiSelect
                  name="subContents"
                  // label={t("sub_contents")}
                  placeholder={t("select") + " " + t("sub_contents")}
                  options={subContents}
                  selected={selectedSubContents}
                  defaultValues={defaultSubContents}
                  handleMultiSelect={handleSubContentsMultiSelect}
                  {...register("subContents", {
                    required: false,
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row-container">
        <div className="button-wrapper">
          {editform ? (
            <Button
              type="button"
              color="danger"
              buttonName={t("cancel")}
              clickHandler={() => handleCancel()}
            />
          ) : (
            <Button
              type="button"
              color="danger"
              buttonName={t("reset")}
              clickHandler={() => {
                setIsSubmitted(false);
                handleClear();
              }}
            />
          )}
          <Button
            type="submit"
            color="success"
            buttonName={
              isSubmitting
                ? `${t("submitting")}`
                : editform
                  ? `${t("update")} ${capitalContent}`
                  : `${t("add")} ${capitalContent}`
            }
            disabled={
              isSubmitting ||
              isFileUploading ||
              isBookLevel1Uploading ||
              isBookLevel2Uploading ||
              isBookLevel3Uploading
            }
            clickHandler={() => setIsSubmitted(true)}
          />
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(ContentForm);
