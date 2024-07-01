import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import Calendar from "react-calendar";
import "./calendar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
import { toast } from "react-toastify";
import config from "../../config";
import CustomEventUserModel from "./CustomEventUserModel";
import Clock from "../../assets/icons/clock.png";
import list from "../../assets/icons/list.png";
import { useTranslation } from "react-i18next";
import EventForm from "./EventForm";

export const EventCalendar = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | any>(new Date());
  const todayDate = new Date();
  const currentDate = todayDate.toDateString();
  const [eventId, setEventId] = useState<string>("");
  const [addEvent, setAddEvents] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [data, setData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [assignedDataCalendar, setAssignedDataCalendar] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [calendarEventDate, setCalendarEventDate] = useState([]);
  const [reset, setReset] = useState(false);
  const [show, setShow] = useState(false);
  const eventApi = config.endpoints.api.events;
  const eventDetailsApi = config.endpoints.api.eventdetails;
  const assignedApi = config.endpoints.api.assigned;
  const [assignedEventDetails, setAssignedEventDetails] = useState();

  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);


  const todayDateDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);

  const FormatedDateDate = new Date(formattedDate).toDateString().slice(0, 15);

  const handleDelete = async id => {
    if (!addEvent) {
      try {
        const response = await http.REMOVE(eventApi.delete(id));
        if (response.status === 200) {
          toast.success(`${t("event")} ${t("deleted_successfully")}`);
          setDeleteEvent(true);
        } else {
          toast.error(`${t("error_in_deleting_the")} ${t("event")}`);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response1 = await http.GET(eventApi.list, "");
        setData([response1]);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, [addEvent, deleteEvent, eventData]);

  useEffect(() => {
    async function getData() {
      try {
        const response1 = await http.GET(assignedApi.list, "");
        setAssignedData([response1]);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, [addEvent]);

  useEffect(() => {
    async function getData() {
      try {
        const eventDetailResponse = await http.GET(eventDetailsApi.details(eventId), "");
        setEventData(eventDetailResponse?.data?.data);
      } catch (err) {
        toast.error(err);
      }
    }
    eventId && edit && getData();
  }, [eventId, edit]);

  const eventDetails = async data => {
    if (!addEvent) {
      setShow(true);
      const response = await http.GET(eventDetailsApi.details(data.id), "");
      setAssignedEventDetails(response.data.data);
    }
  };

  const assignedDateData = assignedData && assignedData[0]?.data?.data;

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (assignedDateData) {
      const objectKey = Object.keys(assignedDateData);
      setAssignedDataCalendar(objectKey);
    }
  }, [assignedDateData]);

  useEffect(() => {
    const dataArray = [];
    for (const id in assignedDataCalendar) {
      if (assignedDataCalendar.hasOwnProperty(id)) {
        const date = assignedDataCalendar[id];
        dataArray.push({ date });
      }
    }
    setCalendarEventDate(dataArray);
  }, [assignedDataCalendar]);

  const renderEventsForDate = date => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const eventsForDate = calendarEventDate.filter(
      event => event.date === utcDate.toISOString().slice(0, 10),
    );
    return (
      <div className="event-titles">
        {eventsForDate.map(event => (
          <div key={event.date} className="event-title">
            {/* {event.date} */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="calendar_page">
        <div className="calendar_full">
          <div className="calendar_title">
            <h1>{t("calendar")}</h1>
            {!addEvent && (
              <FontAwesomeIcon
                className="add_icon"
                icon={faAdd}
                onClick={() => {
                  setReset(true);
                  setAddEvents(!addEvent);
                  setEventData([]);
                  setEdit(false);
                }}
              />
            )}
          </div>
          <Calendar
            className="calendar"
            onChange={setDate}
            defaultActiveStartDate={date}
            tileContent={({ date }) => renderEventsForDate(date)}
          />
          <div className={addEvent ? "adding_event my_events" : "my_events"}>
            <h3>{t("my_event")}</h3>
            {data &&
              data?.map(item => {
                const event_listing = item?.data?.data;
                return event_listing?.map(item2 => {
                  const startDate = new Date(item2?.startDate).toLocaleString();
                  return (
                    <div key={item2.id} className="my_event_one">
                      <div className="event_description">
                        <h2>{item2.title}</h2>
                        <div className="description">
                          <img src={Clock} alt="" />
                          <p>{startDate}</p>
                        </div>
                        <div className="description">
                          <img src={list} alt="" />
                          <p>{item2.description}</p>
                        </div>
                      </div>
                      <div className="action">
                        <FontAwesomeIcon
                          className="details"
                          icon={faEye}
                          onClick={() => eventDetails(item2)}
                        />
                        <FontAwesomeIcon
                          className="edit"
                          icon={faEdit}
                          onClick={() => {
                            setEdit(true);
                            setAddEvents(true);
                            setEventId(item2?.id);
                          }}
                        />
                        <FontAwesomeIcon
                          className="delete"
                          icon={faTrashAlt}
                          onClick={() => handleDelete(item2.id)}
                        />
                      </div>
                    </div>
                  );
                });
              })}
          </div>
        </div>
        <CustomEventUserModel
          title={"Event"}
          assignedEventDetails={assignedEventDetails}
          handleClose={handleClose}
          show={show}
          handleClickSubmit={() => null}
        />
        <div className="today_event">
          {addEvent ? (
            <EventForm
              edit={edit}
              setEdit={setEdit}
              reset={reset}
              eventData={eventData}
              setAddEvents={setAddEvents}
              addEvent={addEvent}
            />
          ) : (
            <div>
              <div className="inside_today_event">
                {formattedDate !== todayDateDate ? (
                  <div className="selected_date">
                    <h4>{t("selected")}</h4> <p>{FormatedDateDate}</p>
                  </div>
                ) : (
                  <div className="selected_date">
                    <h4>{t("today")}</h4> <p>{currentDate}</p>
                  </div>
                )}
                {assignedDateData ? (
                  <>
                    {Object.keys(assignedDateData && assignedDateData).map((item, index) => {
                      if (formattedDate === item) {
                        return assignedDateData?.[formattedDate]?.map(item2 => {
                          var startDate = new Date(item2?.startDate).toLocaleString();
                          return (
                            <div key={item2.id} className="event_calendar_list">
                              <h1>{item2?.title}</h1>
                              <div className="description">
                                <img src={Clock} alt="" />
                                <p>{startDate}</p>
                              </div>
                              <div className="description">
                                <img src={list} alt="" />
                                <p>{item2?.description}</p>
                              </div>
                            </div>
                          );
                        });
                      }
                    })}
                  </>
                ) : (
                  <h5>{t("no_events_today")}!</h5>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
