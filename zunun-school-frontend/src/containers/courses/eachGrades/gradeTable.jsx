import { Table } from "antd";
import { ShimmerTable } from "react-shimmer-effects";
import React from "react";

const columns = [
  {
    title: "Subject",
    dataIndex: "subject",
  },
  {
    title: "Unidad I",
    dataIndex: "i",
  },
  {
    title: "Unidad I",
    dataIndex: "ii",
  },
  {
    title: "Unidad I",
    dataIndex: "iii",
  },
  {
    title: "Unidad I",
    dataIndex: "iv",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];
const data = [
  {
    key: "1",
    subject: "Maths",
    i: 80,
    ii: 90,
    iii: 85,
    iv: 99,
    total: 95,
  },
  {
    key: "2",
    subject: "Maths",
    i: 80,
    ii: 90,
    iii: 85,
    iv: 99,
    total: 95,
  },
  {
    key: "3",
    subject: "Maths",
    i: 80,
    ii: 90,
    iii: 85,
    iv: 99,
    total: 95,
  },
  {
    key: "4",
    subject: "Maths",
    i: 80,
    ii: 90,
    iii: 85,
    iv: 99,
    total: 95,
  },
  {
    key: "5",
    subject: "Maths",
    i: 80,
    ii: 90,
    iii: 85,
    iv: 99,
    total: 95,
  },
];

const GradeTable = ({ initial }) => {
  return (
    <>
      {initial ? (
        <ShimmerTable row={4} col={6} />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="bg-blue-3 md:mx-3 overflow-x-scroll "
          rowClassName={(record, index) =>
            index % 2 === 0 ? "bg-white" : "bg-blue-2"
          }
        />
      )}
    </>
  );
};

export default GradeTable;
