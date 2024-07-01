import React, { useContext, useState } from "react";

export const MeetingContext = React.createContext({
  meeting: {
    meetingId: "",
    meetingPw: "",
    meetingMsdkKey: "",
  },
  setMeeting: (meeting) => {},
});

export const MeetingContextProvider = (props) => {
  const [meeting, setMeeting] = useState({
    meetingId: "",
    meetingPw: "",
    meetingMsdkKey: "",
  });
  return (
    <MeetingContext.Provider
      value={{
        meeting,
        setMeeting,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  const state = useContext(MeetingContext);
  return state;
};
