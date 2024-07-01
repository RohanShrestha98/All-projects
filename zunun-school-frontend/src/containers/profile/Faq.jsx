import React from "react";
import { Collapse, Input } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { BsSearch } from "react-icons/bs";
import searchSuffixImg from "../../assets/images/searchSuffix.png";

const FAQ = () => {
  const { Panel } = Collapse;

  const items = [
    {
      title: "What is Elera?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan . Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan",
    },
    {
      title: "How to use Elera?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan . Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan",
    },
    {
      title: "What is Elera?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan . Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan",
    },
    {
      title: "How to use Elera?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan . Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan",
    },
  ];

  return (
    <div className="mt-7">
      <Input
        placeholder="Search"
        prefix={<BsSearch className="fill-gray-dark3" />}
        suffix={<img src={searchSuffixImg} alt="img" />}
        className="mb-7 "
        type="search"
      />
      {items.map((item, id) => {
        return (
          <Collapse
            key={id}
            className="mb-6"
            accordion
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                style={{ color: "#00B9D6" }}
                rotate={isActive ? 90 : 0}
              />
            )}
            expandIconPosition="end"
          >
            <Panel header={item.title} className="text-[16px]">
              <p className="font-normal text-sm text-gray-4">
                {item.description}
              </p>
            </Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

export default FAQ;
