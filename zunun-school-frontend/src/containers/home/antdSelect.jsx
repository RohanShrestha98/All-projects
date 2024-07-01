import React from "react";
import { Select, Space } from "antd";
import { TiArrowSortedDown } from "react-icons/ti";

const courseOptions = [
  {
    value: "science",
    label: "Science",
  },
  {
    value: "management",
    label: "Management",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "arts",
    label: "Arts",
    disabled: true,
  },
];

const dateOptions = [
  {
    value: "yesterday",
    label: "Yesterday",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "tomorrow",
    label: "Tomorrow",
  },
];

const AntdSelect = ({ sizeMiddle }) => {
  return (
    <div className="border border-gray-100 w-60">
      {sizeMiddle ? (
        <Space wrap>
          <Select
            defaultValue="science"
            className="w-60  "
            options={courseOptions}
            size="middle"
            bordered={null}
            suffixIcon={<TiArrowSortedDown className="text-black text-lg" />}
          />
        </Space>
      ) : (
        <Space wrap>
          <Select
            defaultValue="today"
            className="w-60 "
            options={dateOptions}
            size="small"
            bordered={null}
            suffixIcon={<TiArrowSortedDown className="text-black text-md" />}
          />
        </Space>
      )}
    </div>
  );
};

export default AntdSelect;
