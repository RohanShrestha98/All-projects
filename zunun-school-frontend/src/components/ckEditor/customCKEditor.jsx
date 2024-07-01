import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageInsert,
  ImageInsertViaUrl,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { LinkImage } from "@ckeditor/ckeditor5-link";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { Font } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { PageBreak } from "@ckeditor/ckeditor5-page-break";
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from "@ckeditor/ckeditor5-special-characters";
import {
  Table,
  TableCaption,
  TableCaptionEditing,
  TableCaptionUI,
  TableToolbar,
  TableProperties,
  TableColumnResize,
  TableCellProperties,
  TableSelection,
  TableClipboard,
  TableUtils,
} from "@ckeditor/ckeditor5-table";
import { List } from "@ckeditor/ckeditor5-list";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { useAuthContext } from "../../context/authContext";

export default function CustomCKEditor({ label, value, onChange }) {
  
const hostname = window.location.hostname.split(".");
const isTestServer = hostname[0]?.slice(0,4)==="test" ||  import.meta.env.VITE_SUBDOMAIN_NAME?.slice(0,4) === "test"

  const auth = useAuthContext();
  const editorConfiguration = {
    plugins: [
      Essentials,
      Bold,
      Italic,
      Paragraph,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      LinkImage,
      ImageInsert,
      ImageInsertViaUrl,
      ImageUpload,
      SimpleUploadAdapter,
      Alignment,
      Autoformat,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
      FindAndReplace,
      Font,
      Heading,
      Highlight,
      HtmlEmbed,
      MediaEmbed,
      PageBreak,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Table,
      TableCaption,
      TableCaptionEditing,
      TableCaptionUI,
      TableToolbar,
      TableProperties,
      TableColumnResize,
      TableCellProperties,
      TableSelection,
      TableClipboard,
      TableUtils,
      List,
      BlockQuote,
      Indent,
      IndentBlock,
    ],
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "selectAll",
      "bold",
      "italic",
      "underline",
      "alignment",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "blockQuote",
      "|",
      "fontColor",
      "fontFamily",
      "fontSize",
      "fontBackgroundColor",
      "highlight",
      "|",
      "link",
      "strikethrough",
      "subscript",
      "superscript",
      "specialCharacters",
      "|",
      "insertTable",
      "imageInsert",
      "mediaEmbed",
      "pageBreak",
      "htmlEmbed",
      "findAndReplace",
    ],
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    indentBlock: {
      offset: 1,
      unit: "em",
    },
    image: {
      toolbar: [
        "imageStyle:alignLeft",
        "imageStyle:block",
        "imageStyle:side",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "linkImage",
      ],
      insert: {
        type: "auto",
      },
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: `${isTestServer? import.meta.env.VITE_TEST_BACKEND_BASE_URL:import.meta.env.VITE_BACKEND_BASE_URL}library/ck-uploader/`,
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    },
  };

  return (
    <div className="flex flex-grow flex-col-reverse gap-2 w-full">
      <CKEditor
        id={label}
        editor={ClassicEditor}
        config={editorConfiguration}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
