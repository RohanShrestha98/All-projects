import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryData, useRoleData } from "../../hooks/useQueryData";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import { useAuthContext } from "../../context/authContext";

export default function AddEventForm({
  edit,
  eventData,
  handleCreate,
  handleUpdate,
  currentDateString,
}) {
  const { data: eventDetails, isLoading: eventDetailsLoading } = useQueryData(
    ["event-assigned", eventData?.id],
    `api/v1/event/details/${eventData?.id}`,
    [],
    !!eventData?.id,
  );

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      id: edit ? eventData?.id || "" : null,
      startDate: edit ? eventData?.startDate?.slice(0, -1) || "" : null,
      title: edit ? eventData?.title || "" : null,
      type: edit ? eventData?.type || "" : null,
      endDate: edit ? eventData?.endDate?.slice(0, -1) || "" : null,
      description: edit ? eventData?.description || "" : null,
      status: edit ? eventData?.status || "" : null,
      place: edit ? eventData?.place || "" : null,
      userIds: edit ? eventData?.userIds || [] : null,
    },
  });

  useEffect(() => {
    edit
      ? reset({
          id: eventData?.id,
          startDate: eventData?.startDate?.slice(0, -4),
          title: eventData?.title,
          type: eventData?.type,
          endDate: eventData?.endDate?.slice(0, -4),
          description: eventData?.description,
          status: eventData?.description,
          place: eventData?.place,
          userIds: eventData?.userIds,
        })
      : {};
  }, [eventData, reset]);

  const { data: roleData } = useRoleData();
  const { auth } = useAuthContext();

  const roleOptions = roleData && [
    { id: 0, name: "All" },
    ...(roleData ? roleData : []),
  ];

  const [users, setUsers] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(
    edit ? dayjs(eventData?.openDate).utc() : "",
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    edit ? dayjs(eventData?.dueDate).utc() : "",
  );
  const [userType, setUserType] = useState(eventData?.userType);

  const unAcknowledgedBy = eventDetails?.data?.unAcknowledgedBy ?? [];
  const acknowledgedBy = eventDetails?.data?.acknowledgedBy ?? [];

  const eventUserAssigned = [...unAcknowledgedBy, ...acknowledgedBy];
  const defaultUsers = eventUserAssigned?.map(item => item?.id);

  useEffect(() => {
    if (eventDetails && edit) {
      const unAcknowledgedBy = eventDetails?.data?.unAcknowledgedBy ?? [];
      const acknowledgedBy = eventDetails?.data?.acknowledgedBy ?? [];
      const eventUserAssigned = [...unAcknowledgedBy, ...acknowledgedBy];
      const defaultUsers = eventUserAssigned?.map(item => item?.id);
      setUsers(defaultUsers);
    }
  }, [eventDetails, eventData]);

  const { data: userData } = useQueryData(
    ["user-list", userType],
    `api/v1/user/list/?role=${
      userType === null || undefined ? "all" : userType
    }`,
    "",
    !!userType,
  );

  const userOptions = userData?.data?.map(item => {
    return {
      label: item?.firstName,
      value: item?.id,
    };
  });

  const eventTypeOptions = [
    { value: "reminder", label: "Reminder" },
    { value: "announcement", label: "Announcement" },
  ];

  const handleSelectEventTypeChange = (e, data) => {
    setValue("type", data);
  };
  const handleSelectUserTypeChange = (e, data) => {
    setUserType(data);
    setValue("userType", data);
  };

  const onChangeDate = (name, date) => {
    name === "startDate"
      ? setSelectedStartDate(date)
      : name === "endDate"
      ? setSelectedEndDate(date)
      : null;
    setValue(name, dayjs(date.$d).utc().format());
  };

  const handleUserChange = data => {
    setValue("userIds", data);
    setUsers(data);
  };

  return (
    <>
      {eventDetailsLoading && edit ? (
        <p>Loading...</p>
      ) : (
        <form
          className="w-2/5 md:w-full flex flex-col gap-3"
          onSubmit={handleSubmit(!edit ? handleCreate : handleUpdate)}
        >
          <p className="mt-4  hidden md:inline-block font-medium">
            {currentDateString}
          </p>
          <p className="text-gray-2 mb-[-8px] font-medium">Title</p>
          <input
            type="text"
            {...register("title")}
            className="w-full h-10 bg-white px-4 rounded-lg outline-none focus:ring-1 focus:ring-blue"
            placeholder="Title.."
            required
          />
          <p className="text-gray-2 mb-[-8px] font-medium">Place</p>
          <input
            type="text"
            {...register("place")}
            className="w-full h-10 bg-white px-4 rounded-lg outline-none focus:ring-1 focus:ring-blue"
            placeholder="Place.."
          />
          <p className="text-gray-2 mb-[-8px] font-medium">Start Date</p>
          <DatePicker
            showTime
            required
            disabledDate={d => !d || d?.isBefore(new Date())}
            value={selectedStartDate}
            onChange={e => onChangeDate("startDate", e)}
            placeholder="Start date"
            className="w-full h-10 bg-white px-4 rounded-lg outline-none focus:ring-1 focus:ring-blue"
          />
          <p className="text-gray-2 mb-[-8px] font-medium">End Date</p>
          <DatePicker
            showTime
            required
            disabledDate={d => !d || d?.isBefore(selectedStartDate)}
            value={selectedEndDate}
            onChange={e => onChangeDate("endDate", e)}
            placeholder="End date"
            className="w-full pl-2 border border-gray-dark3 h-10 hover:border-cyan"
          />

          <p className="text-gray-2 mb-[-8px] font-medium">Description</p>
          <textarea
            name="description"
            {...register("description")}
            className="w-full h-40 bg-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-blue"
            placeholder="Description"
            required
          />
          <p className="text-gray-2 mb-[-8px] font-medium">Event Type</p>
          <Select
            defaultValue={edit ? eventData?.type : null}
            onChange={(e, data) => handleSelectEventTypeChange(data, e)}
            options={
              auth?.user?.role?.id !== 5
                ? eventTypeOptions
                : eventTypeOptions?.slice(0, 1)
            }
            placeholder="Select event type"
          />
          {watch("type") === "announcement" && (
            <>
              <p className="text-gray-2 mb-[-8px] font-medium">User Type</p>
              <Select
                defaultValue={edit ? userType : null}
                onChange={(e, data) => handleSelectUserTypeChange(data, e)}
                options={roleOptions?.map(item => {
                  return {
                    value: item?.id,
                    label: item?.name,
                  };
                })}
                placeholder="Select user type"
              />
              <p className="text-gray-2 mb-[-8px] font-medium">Users</p>
              <Select
                defaultValue={edit ? defaultUsers : []}
                onChange={data => handleUserChange(data)}
                options={userOptions}
                disabled={userType === 0}
                mode="multiple"
                placeholder={"Select users"}
                value={users}
              />
            </>
          )}
          <button className="border border-blue py-2 mt-2 rounded-full text-white bg-blue font-semibold hover:text-blue hover:bg-white">
            {edit ? "Update Event" : "Set Event"}
          </button>
        </form>
      )}
    </>
  );
}
