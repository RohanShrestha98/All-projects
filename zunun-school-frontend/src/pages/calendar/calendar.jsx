/* eslint-disable no-unused-vars */
import { Badge, Calendar, Dropdown } from "antd";
import { React } from "react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2, RxEyeOpen } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import "./calendar.css";
import { useQueryData } from "../../hooks/useQueryData";
import EventForm from "./eventForm";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { useForm } from "react-hook-form";
import ConfirmModel from "../../containers/profile/confirmModel";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import AcknowledgedModal from "../../containers/profile/acknowledgedModal";
import { MdOutlineSort } from "react-icons/md";
import ErrorPage from "../../components/errorPage/errorPage";
import noEvents from "../../assets/images/noEvents.png";
import { TruncateText } from "../../utils/truncateText";
import EventDetailsModal from "../../components/modal/EventDetailsModal";
import Pagination from "../../components/pagination/pagination";
import { OptionVerticalSvg } from "../../assets/icons/allSvg";

const AntdCalendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const todayDate = new Date();
  const todayFormatedDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);
  const { reset } = useForm();
  const useEventMutation = () =>
    useMutate(["event-create"], "api/v1/event/create/");
  const useEventUpdateMutation = () =>
    useMutate(["event-create"], "api/v1/event/update");
  const useEventDeleteMutation = () =>
    useMutate(["event-create"], "api/v1/event/delete");
  const useAcknowledgeEventMutation = () =>
    useMutate(["acknowledge-event"], "api/v1/event/acknowledge/");

  const { auth } = useAuthContext();

  const { mutateAsync } = useEventMutation();
  const mutateUpdateAsync = useEventUpdateMutation().mutateAsync;
  const mutateDeleteAsync = useEventDeleteMutation().mutateAsync;
  const mutateAcknowledgeEventAsync = useAcknowledgeEventMutation().mutateAsync;

  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [initial, setInitial] = useState(true);
  const [eventData, setEventData] = useState([]);
  const [deletedId, setDeletedId] = useState("");
  const [selectedAssigned, setSelectedAssigned] = useState();
  const [selectedEventId, setSelectedEventId] = useState("");
  const [edit, setEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  const { data } = useQueryData(
    ["event-create", searchText, page],
    `api/v1/event/list/?query=${searchText}&&page=${page}`,
    [],
    open ? true : false,
  );

  const { data: assignedData } = useQueryData(
    ["event-assigned", selectedEventId],
    "api/v1/event/assigned/",
  );
  const assignedSelectedDate = dayjs(selectedValue.$d).format("YYYY-MM-DD");
  const assignedDateKeys = assignedData && Object.keys(assignedData?.data);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);
  const handleAcknowledgeEvent = async date => {
    const postData = {
      date: dayjs(date).format("YYYY-MM-DD"),
    };
    try {
      const response = await mutateAcknowledgeEventAsync([
        "post",
        "",
        postData,
      ]);
      if (response.success) {
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

  const onSelect = newValue => {
    setValue(newValue);
    handleAcknowledgeEvent(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = newValue => {
    setValue(newValue);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const convertTo12HrsFormat = () => {
    let hour = currentTime.getHours();
    let ampm = hour >= 12 ? "PM" : "AM";
    const minute = currentTime.getMinutes();
    if (hour > 12) {
      hour = hour - 12;
    } else {
      hour;
    }

    return `${hour.toString().length === 1 ? `0${hour}` : hour}:${
      minute.toString().length === 1 ? `0${minute}` : minute
    } ${ampm}`;
  };

  useEffect(() => {
    changeLayout(width, true, true, "light");
  }, [width]);

  const handleFormOpen = () => {
    setEdit(false);
    reset();
    setFormOpen(!formOpen);
  };

  const handleCreate = async data => {
    setEdit(false);
    data.startDate = new Date(`${data.startDate}`).toISOString();
    data.endDate = new Date(`${data.endDate}`).toISOString();
    try {
      const response = await mutateAsync(["post", "", data]);
      if (response.success) {
        setFormOpen(false);
        toast.success("Event Added Successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

  const handleUpdateFormOpen = data => {
    window.scrollTo(0, 0);
    setEventData(data);
    setEdit(true);
    setFormOpen(true);
  };

  const handleUpdate = async data => {
    try {
      const patchData = {
        id: data.id,
        endDate: new Date(`${data.endDate}`).toISOString(),
        startDate: new Date(`${data.startDate}`).toISOString(),
        place: data.place,
        description: data.description,
        type: data.type,
        status: data.status,
        title: data.title,
        userIds: data.userIds,
      };
      const response = await mutateUpdateAsync([
        "patch",
        `/${data.id}/`,
        patchData,
      ]);
      if (response.success) {
        setFormOpen(false);
        toast.success("Event Updated Successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

  const handleConfirm = id => {
    setConfirmModel(!confirmModel);
    setDeletedId(id);
  };

  const handleDelete = async id => {
    try {
      const response = await mutateDeleteAsync(["delete", `/${id}/`]);
      if (response.success) {
        setConfirmModel(false);
        toast.success("Event Deleted Successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

  function getListData(value) {
    let listData;
    if (value) {
      assignedDateKeys?.map(item => {
        const formattedDate = dayjs(item).format("YYYY/MM/DD");
        if (formattedDate === value) {
          return (listData = [{ type: "" }]);
        }
      });
      return listData;
    }
  }

  const dateCellRender = value => {
    const formattedDate = dayjs(value?.$d);
    const listData = getListData(formattedDate?.format("YYYY/MM/DD"));
    return (
      <ul className="events">
        {listData?.map((item, index) => (
          <li key={`${item.content}-${index}`}>
            <Badge
              status={item.type}
              text={item.content}
              className="absolute w-2 h-2 ml-2 rounded-full bg-red top-0  list-none"
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col md:px-6 event sm:mt-28">
      {initial ? (
        <div className="w-32 sm:hidden">
          <ShimmerText line={1} />
        </div>
      ) : (
        <div
          className={`flex justify-between items-center ${
            formOpen ? "w-full" : "w-3/5 md:w-full"
          } `}
        >
          <h1 className="text-2xl font-bold ">Calendar</h1>
          <div className="flex items-center gap-4">
            {formOpen && (
              <p className="text-gray-light text-base md:hidden font-semibold mb-4">
                {currentDateString}
              </p>
            )}
            <div
              className={` ${
                !formOpen
                  ? "mr-7 md:mr-0 bg-blue hover:text-blue "
                  : "bg-red hover:text-red"
              } p-3  text-white mb-3 rounded-full hover:bg-white `}
              onClick={handleFormOpen}
            >
              {" "}
              {formOpen ? (
                <RxCross2 className="font-bold" />
              ) : (
                <AiOutlinePlus className="font-bold" />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-7 md:block ">
        <div className="h-full  items-center w-3/5 md:w-full ">
          {initial ? (
            <ShimmerThumbnail />
          ) : (
            <div className="relative">
              <div className="pb-2">
                <Calendar
                  cellRender={dateCellRender}
                  fullscreen={false}
                  onSelect={onSelect}
                  onPanelChange={onPanelChange}
                  value={value}
                  className="shadow-md"
                />
              </div>
              {/* <div className="font-normal text-sm mb-[39px] absolute bottom-0 right-0 mr-4">
                <span className="mr-4">Time</span>
                <span className="bg-gray-16 rounded-lg py-[6px] px-[12px]">
                  {convertTo12HrsFormat()}
                </span>
              </div> */}
              <div>
                <div className="flex items-center mt-10 pr-4  mb-4 justify-between">
                  {initial ? (
                    <div className="w-32">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <h1 className="text-xl font-bold  text-black-gray">
                      My Events
                    </h1>
                  )}
                  <>
                    {initial ? (
                      <div className="w-32">
                        <ShimmerText line={1} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-white  rounded-md outline-none px-4 py-1 ">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchText}
                          onChange={e => setSearchText(e.target.value)}
                          className="outline-none w-full bg-transparent"
                        />
                        {searchText && (
                          <RxCross2
                            className="cursor-pointer"
                            onClick={() => setSearchText("")}
                          />
                        )}
                      </div>
                    )}
                  </>
                </div>

                <div className="w-full pr-4 space-y-2 md:w-full">
                  {data?.data?.map((assignment, id) => {
                    if (auth?.user?.role?.id !== 5) {
                      const startDate = new Date(
                        assignment?.startDate,
                      ).toLocaleString();

                      const items = [
                        {
                          key: "1",
                          label: (
                            <div
                              onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                setIsOpen(true);
                                setSelectedEventId(assignment?.id);
                              }}
                              className="flex items-center gap-1"
                            >
                              <RxEyeOpen className="text-green text-xl" /> Open
                            </div>
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <div
                              onClick={() =>
                                assignment.type !== "assignment" &&
                                handleUpdateFormOpen(assignment)
                              }
                              className="flex items-center gap-1"
                            >
                              <AiOutlineEdit
                                className={`text-2xl ${
                                  assignment?.type !== "assignment" &&
                                  "text-blue"
                                }`}
                              />{" "}
                              Edit
                            </div>
                          ),
                          disabled: assignment?.type === "assignment",
                        },
                        {
                          key: "3",
                          label: (
                            <div
                              className="flex items-center gap-1 "
                              onClick={() => {
                                setConfirmModel(true);
                                assignment?.type !== "assignment" &&
                                  handleConfirm(assignment?.id);
                              }}
                            >
                              <BiTrash
                                className={`text-2xl ${
                                  assignment?.type !== "assignment" &&
                                  "text-red"
                                }`}
                              />
                              Delete
                            </div>
                          ),
                          disabled: assignment?.type === "assignment",
                        },
                      ];
                      return (
                        <NavLink
                          key={id}
                          to={
                            assignment?.type === "assignment" &&
                            "/assignment/list"
                          }
                        >
                          <div className="flex justify-between items-start rounded-xl pt-4 pb-3 px-4 mt-3 bg-white sm:pr-2 sm:gap-2">
                            <div className="space-y-2">
                              {initial ? (
                                <div className="w-32">
                                  <ShimmerText line={1} />
                                </div>
                              ) : (
                                <p className="text-base flex items-start gap-2 font-semibold line-clamp-1 text-black">
                                  {assignment?.title?.slice(0, 40)}{" "}
                                  <p
                                    className={`border ${
                                      assignment?.type === "assignment"
                                        ? "bg-blue  "
                                        : assignment?.type === "reminder"
                                        ? "bg-red "
                                        : "bg-yellow"
                                    } text-white  rounded-tl-xl rounded-br-xl  text-sm px-3`}
                                  >
                                    {assignment?.type}
                                  </p>
                                </p>
                              )}

                              <div className="flex gap-2 items-center">
                                {initial ? (
                                  <ShimmerCircularImage size={20} />
                                ) : (
                                  <AiOutlineClockCircle />
                                )}
                                {initial ? (
                                  <div className="w-32">
                                    <ShimmerText line={1} />
                                  </div>
                                ) : (
                                  <p className="text-gray-slate text-sm">
                                    {/* {selectedValue?.format("YYYY-MM-DD | dddd HH:mmA")} */}
                                    {startDate}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2 items-center text-sm">
                                {assignment?.description && (
                                  <>
                                    {initial ? (
                                      <ShimmerCircularImage size={20} />
                                    ) : (
                                      <MdOutlineSort className="text-gray-slate" />
                                    )}
                                  </>
                                )}

                                {initial ? (
                                  <div className="w-32">
                                    <ShimmerText line={1} />
                                  </div>
                                ) : (
                                  <p className="text-gray-slate font-semibold line-clamp-1">
                                    {assignment?.description?.slice(0, 120)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Dropdown
                              menu={{ items }}
                              onClick={e => e.stopPropagation()}
                              placement="bottomRight"
                              className="flex justify-end"
                            >
                              <p
                                onClick={e => {
                                  e.preventDefault();
                                }}
                              >
                                <OptionVerticalSvg
                                  className={"h-5 w-5 hover:cursor-pointer"}
                                />
                              </p>
                            </Dropdown>
                          </div>
                        </NavLink>
                      );
                    }
                  })}
                </div>
                {data?.data?.length !== 0 ? (
                  <div className="flex justify-end pr-2">
                    <Pagination
                      handlePageChange={page => setPage(page)}
                      currentPage={data?.currentPage}
                      totalPage={data?.totalPage}
                    />
                  </div>
                ) : (
                  <ErrorPage
                    emptyImage={noEvents}
                    title={"No events to show"}
                    height={"200px"}
                    width={"250px"}
                    isFetching={false}
                    isError={false}
                    data={[]}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {!formOpen ? (
          <div className="w-2/5 md:w-full">
            {initial ? (
              <div className="w-32">
                <ShimmerText line={1} />
              </div>
            ) : (
              <div className="font-bold text-lg mb-1 md:mt-2">Selected</div>
            )}
            {!initial && (
              <p className="text-gray-slate font-medium text-[16px]">
                {selectedValue?.format("dddd D, MMMM")}
              </p>
            )}
            {initial ? (
              <div className="w-32">
                <ShimmerText line={1} />
              </div>
            ) : (
              <>
                {todayFormatedDate > selectedValue?.format("YYYY-MM-DD") ? (
                  <p className="text-red-shade text-[17px] font-bold mt-7 mb-4">
                    Completed Events
                  </p>
                ) : (
                  <p className="text-[17px] font-bold mt-7 mb-4">
                    Upcoming Events
                  </p>
                )}
              </>
            )}
            {assignedData?.data?.[`${assignedSelectedDate}`]?.map(item => {
              if (
                item.startDate.slice(0, 10) ===
                selectedValue?.format("YYYY-MM-DD")
              ) {
                const startDate = new Date(item?.startDate).toLocaleString();
                return (
                  <Link
                    to={item.type === "assignment" && "/assignment"}
                    key={item.id}
                    className={`flex justify-between items-center border ${
                      todayFormatedDate > selectedValue?.format("YYYY-MM-DD")
                        ? "border-red-5 "
                        : "border-gray-12 "
                    } rounded-xl pt-4 pb-3 px-4 mb-2  bg-white`}
                  >
                    <div className="space-y-2 w-full">
                      {initial ? (
                        <div className="w-32">
                          <ShimmerText line={1} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full ">
                          <p className="text-[15px] font-bold text-black">
                            {TruncateText(item.title, 40)}
                          </p>
                          <RxEyeOpen
                            onClick={e => {
                              e.stopPropagation();
                              e.preventDefault();
                              setSelectedAssigned(item);
                              setIsEventDetailOpen(true);
                            }}
                            className="text-green text-xl"
                          />
                        </div>
                      )}
                      {initial ? (
                        <div className="w-32">
                          <ShimmerText line={1} />
                        </div>
                      ) : (
                        <p className="text-[15px] font-medium text-gray">
                          {TruncateText(item.description, 50)}
                        </p>
                      )}
                      <div className="flex gap-2 items-center">
                        {initial ? (
                          <ShimmerCircularImage size={20} />
                        ) : (
                          <AiOutlineClockCircle />
                        )}
                        {initial ? (
                          <div className="w-32">
                            <ShimmerText line={1} />
                          </div>
                        ) : (
                          <p className="text-gray-slate font-medium text-[13px]">
                            {startDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              }
              // else{
              //   <ErrorPage
              //     emptyImage={noEvents}
              //     title={"No events to show"}
              //     height={"300px"}
              //     width={"350px"}
              //     isFetching={false}
              //     isError={false}
              //     data={[]}
              // />
              // }
            })}
            {!assignedData?.data?.[`${assignedSelectedDate}`]?.length && (
              <ErrorPage
                emptyImage={noEvents}
                title={"No events to show"}
                height={"300px"}
                width={"350px"}
                isFetching={false}
                isError={false}
                data={[]}
              />
            )}
          </div>
        ) : (
          <EventForm
            currentDateString={currentDateString}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            edit={edit}
            eventData={eventData}
          />
        )}
      </div>

      {confirmModel && (
        <ConfirmModel
          title={"Delete Event"}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={"Are you sure you want to delete this event?"}
          className={"bg-red hover:text-red hover:bg-white "}
          btnName={"Delete"}
          handleConfirm={() => handleDelete(deletedId)}
        />
      )}
      {isOpen && (
        <AcknowledgedModal
          open={isOpen}
          id={selectedEventId}
          setOpen={setIsOpen}
        />
      )}
      {isEventDetailOpen && (
        <EventDetailsModal
          open={isEventDetailOpen}
          data={selectedAssigned}
          setOpen={setIsEventDetailOpen}
        />
      )}
    </div>
  );
};

export default AntdCalendar;
