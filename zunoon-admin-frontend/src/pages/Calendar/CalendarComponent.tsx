import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import Calendar from 'react-calendar'
import "./calendar.scss"
import http from '../../utils/http'
import { toast } from 'react-toastify'
import config from '../../config'




export default function CalendarComponent() {
    const [date, setDate] = useState(new Date())
    const [assignedData, setAssignedData] = useState([])
    const [assignedDataCalendar, setAssignedDataCalendar] = useState([])
    const [calendarEventDate, setCalendarEventDate] = useState([])
    const assignedApi = config.endpoints.api.assigned;
    useEffect(() => {
        async function getData() {
            try {
                const response1 = await http.GET(assignedApi.list, "");
                setAssignedData([response1])
            } catch (err) {
                toast.error(err);
            }
        }
        getData();
    }, []);

    const assignedDateData = assignedData && assignedData[0]?.data?.data

    useEffect(() => {
        if (assignedDateData) {
            const objectKey = Object.keys(assignedDateData)
            setAssignedDataCalendar(objectKey)
        }
    }, [assignedDateData])


    useEffect(() => {
        const dataArray = [];
        for (const id in assignedDataCalendar) {
            if (assignedDataCalendar.hasOwnProperty(id)) {
                const date = assignedDataCalendar[id];
                dataArray.push({ date });
            }
        }
        setCalendarEventDate(dataArray)
    }, [assignedDataCalendar])


    const renderEventsForDate = (date) => {

        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

        const eventsForDate = calendarEventDate.filter((event) => event.date === utcDate.toISOString().slice(0, 10));
        return (
            <div className="event-titles">
                {eventsForDate.map((event) => (
                    <div key={event.date} className="event-title">
                        {/* {event.date} */}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Calendar className="calendar" onChange={setDate} value={date}
                tileContent={({ date }) => renderEventsForDate(date)} />
        </>
    )
}
