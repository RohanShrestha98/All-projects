import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import http from "../../utils/http";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./calendar.scss";
import toast from "../../utils/toast";
import UtcDateConverter from "../../utils/utcDateConverter";
import InputField from "../../components/InputField/InputField";
import Textarea from "../../components/Textarea/Textarea";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

const eventApi = config.endpoints.api.events;
const userApi = config.endpoints.api.user;

export default function EventForm({
  edit,
  setEdit,
  eventData,
  setAddEvents,
  addEvent,
  reset: resetField,
}) {
  const { t } = useTranslation();
  const todayDate = new Date();
  const currentDate = todayDate.toDateString();
  const [watchDescription, setWatchDescription] = useState(eventData?.description);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      id: eventData?.id || "",
      startDate: eventData?.startDate?.slice(0, -1) || "",
      title: eventData?.title || "",
      type: eventData?.type || "",
      endDate: eventData?.endDate?.slice(0, -1) || "",
      description: eventData?.description || "",
      status: eventData?.status || "",
      place: eventData?.place || "",
      userIds: eventData?.userIds || [],
    },
  });

  useEffect(() => {
    reset({
      id: eventData?.id || "",
      startDate: eventData?.startDate?.slice(0, -1) || "",
      title: eventData?.title || "",
      type: eventData?.type || "",
      endDate: eventData?.endDate?.slice(0, -1) || "",
      description: eventData?.description || "",
      status: eventData?.status || "",
      place: eventData?.place || "",
      userIds: eventData?.userIds || [],
    });
    setWatchDescription(eventData?.description);
  }, [eventData, reset]);

  const eventOptions = [
    { value: "announcement", label: t("announcement") },
    { value: "reminder", label: t("reminder") },
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [userOption, setUserOption] = useState([]);
  const [eventType, setEventType] = useState("");
  const [status, setStatus] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const Watch = watch("type");


  useEffect(() => {
    edit && setSelectedEvent(eventOptions?.find(item => item?.value === eventData?.type));
    const totalUser = eventData?.unAcknowledgedBy;
    const selectedUser = totalUser?.map(item => {
      return {
        value: item?.id,
        label: item?.username,
      };
    });
    edit && setSelectedUsers(selectedUser);
  }, [eventData, edit]);

  const statusOptions = [
    { value: "isPublic", label: t("isPublic") },
    { value: "isDraft", label: t("isDraft") },
  ];
  useEffect(() => {
    async function getData() {
      try {
        const response1 = await http.GET(userApi.list, "");
        setData([response1]);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (edit) {
      setEventType(eventData?.type);
      setStatus(eventData?.status);
    }
  }, [edit]);

  useEffect(() => {
    if (data) {
      const filteredUserData = data && data[0]?.data?.data;
      setUserOption(filteredUserData);
    }
  }, [data]);

  const dataArray = [];
  for (const id in userOption) {
    if (userOption.hasOwnProperty(id)) {
      const value = userOption[id].id;
      const label = userOption[id].username;
      dataArray.push({ value, label });
    }
  }

  const handleSelectEventTypeChange = (e, data) => {
    setSelectedEvent(data);
    setEventType(data);
    setValue("type", data.value);
  };
  const handleSelectStatusChange = (e, data) => {
    setStatus(data);
    setValue("status", data.value);
  };

  const handleCreate = data => {
    setEdit(false);
    const utcStartDate = UtcDateConverter(data?.startDate);
    const utcEndDate = UtcDateConverter(data?.endDate);

    data.startDate = new Date(utcStartDate);
    data.endDate = new Date(utcEndDate);

    http
      .POST(eventApi.create, data)
      .then(() => {
        toast.success(`${t("event")} ${t("added_successfully")}`);
        setAddEvents(false);
      })
      .catch(error => {
        setError(error.response.data?.errors);
        // toast.error(error.message);
      });
  };
  const handleReset = () => {
    reset();
  };

  const handleUpdate = data => {
    http
      .PATCH(eventApi.update(data.id), {
        id: data.id,
        startDate: new Date(UtcDateConverter(data?.startDate)),
        endDate: new Date(UtcDateConverter(data?.endDate)),
        place: data.place,
        description: data.description,
        type: data.type,
        status: data.status,
        title: data.title,
        userIds: data.userIds,
      })
      .then(() => {
        toast.success(` ${t("event")} ${t("updated_successfully")}`);
        setEdit(false);
        setAddEvents(false);
      })
      .catch(error => {
        setError(error.response.data?.errors);
        // toast.error(error.response.data.errors.error || "Something went wrong");
      })
      .finally(() => { });
  };

  const handleMultiSelectUser = (users: any) => {
    setSelectedUsers(users);
    const userIds = users?.map(item => item.value);
    setValue("userIds", userIds);
  };
  const minDate = new Date().toISOString().slice(0, 16);
  const minEndDate = watch("startDate")?.slice(0, 16);


  return (
    <form onSubmit={handleSubmit(edit ? handleUpdate : handleCreate)} className="add_events">
      <div className="add_event_title">
        <h3>{edit ? "Update Event" : "Add Event"}</h3>
        <div className="event_title">
          <p>{currentDate}</p>
          <FontAwesomeIcon
            className="cross_icon"
            icon={faClose}
            onClick={() => {
              handleReset();
              setEdit(false);
              setAddEvents(!addEvent);
            }}
          />
        </div>
      </div>
      <InputField
        required
        type="text"
        label={t("title")}
        name="title"
        placeholder={t("title")}
        {...register("title", {
          required: true,
        })}
        onKeyUp={e => {
          e.target.value = e?.target?.value?.trimStart();
        }}
        watchValue={watch("title")}
      />
      {errors?.title?.type === "required" && <p className="error_message">{t("title_required")}</p>}
      {error?.title && <p className="error_message">{error?.title}</p>}

      <Textarea
        label={t("th_description")}
        rows={4}
        placeholder={`${t("enter")} ${t("th_description")}`}
        required={true}
        {...register("description", {
          required: true,
        })}
        onChange={e => {
          e.target.value = e?.target?.value?.trimStart();
        }}
        watchValue={watchDescription}
      />
      {errors?.description?.type === "required" && (
        <p className="error_message">{t("description_is_required")}</p>
      )}
      {error?.description && <p className="error_message">{error?.description}</p>}

      <InputField
        required
        type="text"
        label={t("place")}
        name="place"
        placeholder={t("place")}
        {...register("place", {
          required: true,
        })}
        onKeyUp={e => {
          e.target.value = e?.target?.value?.trimStart();
        }}
        watchValue={watch("place")}
      />
      {errors?.place?.type === "required" && <p className="error_message">{t("place_required")}</p>}
      {error?.place && <p className="error_message">{error?.place}</p>}

      <InputField
        required
        type="datetime-local"
        label={t("start_date")}
        name="startDate"
        placeholder={`${t("enter")} ${t("start_date")}`}
        min={!edit && minDate}
        {...register("startDate", {
          required: true,
        })}
      />
      {errors?.startDate?.type === "required" && (
        <p className="error_message">{t("start_date_is_required")}</p>
      )}
      {error?.startDate && <p className="error_message">{error?.startDate}</p>}


      <InputField
        required
        type="datetime-local"
        label={t("end_date")}
        name="endDate"
        placeholder={`${t("enter")} ${t("end_date")}`}
        min={!edit && minEndDate}
        {...register("endDate", {
          required: true,
        })}
      />
      {errors?.endDate?.type === "required" && (
        <p className="error_message">{t("end_date_is_required")}</p>
      )}
      {error?.endDate && <p className="error_message">{error?.endDate}</p>}

      <CustomSelect
        id="type"
        register={register}
        placeholder={`${t("select")} ${t("event_type")}`}
        name="type"
        required
        label={t("event_type")}
        handleChange={(e, data) => {
          handleSelectEventTypeChange(data, e);
        }}
        value={selectedEvent}
        options={eventOptions}
      />
      {errors?.type?.type === "required" && (
        <p className="error_message">{t("type_is_required")}</p>
      )}
      {error?.type && <p className="error_message">{error?.type}</p>}

      {Watch === "announcement" && (
        <MultiSelect
          label={t("user")}
          options={dataArray}
          placeholder={t("select")}
          selected={selectedUsers}
          handleMultiSelect={handleMultiSelectUser}
          {...register("userIds", {
            required: false,
          })}
        />
      )}

      <div className="event_button">
        <Button
          type="submit"
          color="success"
          buttonName={`${edit ? `${t("update")} ${t("event")}` : `${t("add")} ${t("event")}`}`}
          clickHandler={() => { }}
        />
      </div>
    </form>
  );
}
