import React from "react";
import { Collapse, Input } from "antd";
import searchSuffixImg from "../../images/searchSuffix.png";
import { RightArrowSvg, SearchSvg } from "../../assets/allSvg";

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
    <div className="mt-7 editProfile">
      <Input
        placeholder="Search"
        prefix={<SearchSvg className="fill-gray-dark3" />}
        suffix={<img src={searchSuffixImg} alt="img" />}
        className="mb-7"
      />
      {items.map((item, id) => {
        return (
          <Collapse
            key={id}
            className="mb-6"
            accordion
            expandIcon={({ isActive }) => (
              <RightArrowSvg
                style={{ color: "#00B9D6" }}
                rotate={isActive ? 90 : 0}
              />
            )}
            expandIconPosition="end">
            <Panel header={item.title}>
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
