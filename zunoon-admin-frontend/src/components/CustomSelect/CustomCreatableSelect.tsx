import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { ITagsSelect } from "../../@types/select";
import { useTranslation, withTranslation } from "react-i18next";

interface TagInputProps {
  focused: boolean;
}

const TagInput = styled.div<TagInputProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  padding: 0.56em;
  flex-wrap: wrap;
  border: ${props => (props?.focused ? "1px solid #00bad6" : "1px solid #989e9a")};

  &:hover {
    border: 1px solid #00bad6;
  }

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;

    &:placeholder {
      font-size: 0.95rem;
    }
  }

  .tag {
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: #eeeeee;
    color: #00bad6;

    .close-icon {
      background-color: #00bad6;
      border-radius: 2px;
      padding: 0.2rem 0.4rem;

      svg {
        font-size: 1rem;
        cursor: pointer;

        color: #fff;
      }
    }
  }
`;

export default function CustomCreatableSelect(props: ITagsSelect) {

  const { name, label, tags, setTags, required, min = 3, register, isSubmitted, ...rest } = props;
  const [error, setError] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { t } = useTranslation()


  useEffect(() => {
    if (isSubmitted && tags?.length < min) {
      setError(`${min} or more ${name} must be provided`);
    } else {
      setError("");
    }
  }, [tags, min, isSubmitted]);

  const handleKeyDown = e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    const value = e.target.value.trim();

    if (value?.length <= 2) {
      setError(`${name} ${t("must_be_3_or_more_characters")}`);
      return;
    }

    if (tags?.includes(value)) {
      setError(`${name} ${t("already_exists")}`);
      e.target.value = "";
      return;
    }

    if (!value) return;
    setTags([...tags, value]);
    e.target.value = "";
    setError("");
  };

  const removeTags = (index: any) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <>
      <div className="createable_select_label_container">
        {label && <label htmlFor={name}>{label}</label>}
        {required && <span>*</span>}
      </div>
      <TagInput focused={focused}>
        {tags?.map((tag: string, index: number) => (
          <div className="tag" key={index}>
            {tag}
            <div className="close-icon" onClick={() => removeTags(index)}>
              <MdClose />
            </div>
          </div>
        ))}
        <input
          type="text"
          placeholder='Type your key, then hit the spacebar to add tags'
          {...register(name, { required: tags.length < 3 ? true : false })}
          {...rest}
          onKeyDown={e => {
            handleKeyDown(e);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </TagInput>
      {error && <p style={{ position: "relative", fontSize: "1rem", color: "#e91e63" }}>{error}</p>}
    </>
  );
}
