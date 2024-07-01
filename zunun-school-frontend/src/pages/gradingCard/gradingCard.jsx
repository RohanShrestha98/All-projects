import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryData } from "../../hooks/useQueryData";
import { ShimmerTable } from "react-shimmer-effects";
import { ReactTable } from "../../components/table/table";
import { Tooltip } from "antd";
import ErrorPage from "../../components/errorPage/errorPage";
import { useState } from "react";
import RemarksModal from "../../components/modal/RemarksModal";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { BiArrowBack } from "react-icons/bi";
import DownloadPdfModal from "../../components/modal/DownloadPdfModal";
import noData from "../../assets/images/noData.jpg";
import noRemarks from "../../assets/images/noRemarks.png";

export default function GradingCard() {
  const location = useLocation();
  const [open, setOpen] = useState();
  const [gradingCreate, setGradingCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const useCreateGradingMutation = () =>
    useMutate(
      ["grading-remarks", location?.state?.id],
      `api/v1/grading-card/create/${location?.state?.id}/`,
      "",
      gradingCreate,
    );
  const navigate = useNavigate();
  const { mutateAsync } = useCreateGradingMutation();
  const { data, isError, isLoading, isFetching } = useQueryData(
    ["grading-remarks", location?.state?.id, gradingCreate],
    `api/v1/grading-card/${location?.state?.id}`,
    "",
    !!location?.state?.id,
    gradingCreate,
  );

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: props => props.column.id,
      },
      {
        id: "course",
        cell: info => {
          return <>{info?.row?.original?.name}</>;
        },
        header: () => <span>Course</span>,
        footer: props => props.column.id,
      },
      {
        id: "unit1",
        cell: ({ row }) => {
          return <>{row?.original?.units[0]?.point}</>;
        },
        header: () => <span>Unit 1</span>,
        footer: ({ column }) => column.id,
      },
      {
        id: "unit2",
        cell: ({ row }) => {
          return <>{row?.original?.units[1]?.point}</>;
        },
        header: () => <span>Unit 2</span>,
        footer: ({ column }) => column.id,
      },
      {
        id: "unit3",
        cell: ({ row }) => {
          return <>{row?.original?.units[2]?.point}</>;
        },
        header: () => <span>Unit 3</span>,
        footer: ({ column }) => column.id,
      },
      {
        id: "unit4",
        cell: ({ row }) => {
          return <>{row?.original?.units[3]?.point}</>;
        },
        header: () => <span>Unit 4</span>,
        footer: ({ column }) => column.id,
      },
      {
        id: "average",
        cell: ({ row }) => {
          return <>{row?.original?.average}</>;
        },
        header: () => <span>Average</span>,
        footer: ({ column }) => column.id,
      },
    ],
    [],
  );
  const remarksColumns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <Tooltip
              placement="top"
              title={row?.title}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.title}
            </Tooltip>
          );
        },
        id: "name",
        cell: info => info.getValue(),
        header: () => <span>Title</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <Tooltip
              placement="top"
              title={row?.communication}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.communication}
            </Tooltip>
          );
        },
        id: "communication",
        cell: info => info.getValue(),
        header: () => <span>Communication</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <Tooltip
              placement="top"
              title={row?.logicalThinking}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.logicalThinking}
            </Tooltip>
          );
        },
        id: "logicalThinking",
        cell: info => info.getValue(),
        header: () => <span>Logical Thinking</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );

  const handleCreateGradingCard = async () => {
    setGradingCreate(true);
    try {
      const response = await mutateAsync(["post", ""]);
      if (response.success) {
        toast.success(
          data?.data?.courses
            ? "Grading card updated successfully"
            : "Grading card created successfully",
        );
        setGradingCreate(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };

  // const generatePDF = () => {
  //   const report = new JsPDF("landscape", "px", "a3");
  //   report.html(document.querySelector("#report")).then(() => {
  //     report.save("report.pdf");
  //   });
  // };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-lg font-bold sm:font-medium flex items-center gap-1 sm:text-base">
          <button
            className="flex items-center gap-1 mr-4 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack size={16} />
          </button>
          Grading Card
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateGradingCard}
            className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
          >
            {" "}
            {data?.data?.courses
              ? "Update Grading Card"
              : "Create Grading Card"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
          >
            Preview Pdf
          </button>
        </div>
      </div>

      <div>
        {isFetching ? (
          <ShimmerTable col={5} row={10} />
        ) : data?.data ? (
          <ReactTable
            title={"No Grading Card found"}
            columns={columns}
            data={data?.data?.courses ?? []}
            gradingCard={true}
            emptyImage={noData}
          />
        ) : (
          <ErrorPage
            emptyImage={noData}
            data={data?.data}
            isFetching={isLoading}
            error={isError}
            title={"No Grading Card found"}
          />
        )}
        <div className="flex items-center justify-between my-6">
          <h1 className="text-base md:text-lg font-bold sm:font-medium sm:text-base">
            Remarks Table
          </h1>

          <div>
            <button
              className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
              onClick={() => setOpen(!open)}
            >
              {data?.data?.remarks ? "Update Remarks" : "Create Remarks"}
            </button>
            {open && (
              <RemarksModal
                setIsModalOpen={setOpen}
                isModalOpen={open}
                edit={data?.data?.remarks ? true : false}
                defaultValue={data?.data?.remarks}
                studentId={location?.state?.id}
              />
            )}
          </div>
        </div>
        {isFetching ? (
          <ShimmerTable col={5} row={16} />
        ) : data?.data ? (
          <ReactTable
            emptyImage={noRemarks}
            title={"No Remarks found"}
            gradingCard={true}
            columns={remarksColumns}
            data={data?.data?.remarks ?? []}
          />
        ) : (
          <ErrorPage
            // emptyImage={noRemarks}
            data={data?.data}
            isFetching={isLoading}
            error={isError}
            title={"No Grading Card found"}
          />
        )}
        {isModalOpen && (
          <DownloadPdfModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            data={data?.data}
          />
        )}
      </div>
    </div>
  );
}
