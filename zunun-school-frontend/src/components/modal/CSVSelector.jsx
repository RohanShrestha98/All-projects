// components/CSVSelector.tsx
import { message } from "antd";
import React from "react";

const CSVSelector = ({ setCsvFile, setCsvData, setFileName }) => {
  const handleFileChange = async e => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        setCsvFile(file);
        setFileName(file.name);

        // 1. create url from the file
        const fileUrl = URL.createObjectURL(file);

        // 2. use fetch API to read the file
        const response = await fetch(fileUrl);

        // 3. get the text from the response
        const text = await response.text();

        // 4. split the text by newline
        const lines = text.split("\n");

        // 5. map through all the lines and split each line by comma.
        const _data = lines.map(line => line.split(","));

        // 6. call the onChange event
        setCsvData(_data);
      } catch (error) {
        message.error(error, [2]);
      }
    }
  };

  return (
    <input
      className="hidden"
      type="file"
      id="studentUpload"
      accept=".csv"
      onChange={handleFileChange}
    />
  );
};

export default CSVSelector;
