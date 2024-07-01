import React from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { baseUrl } from "../../config/config";
import { useContext } from "react";
import { MeetingContext } from "../context/meetingContext";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const ZoomMeetingSDK = () => {
  const axiosPrivate = useAxiosPrivate();
  const client = ZoomMtgEmbedded.createClient();
  const { user } = useAuthStore();
  const { meeting, setMeeting } = useContext(MeetingContext);

  let meetingSDKElement = document.getElementById("meetingSDKElement");

  const getMdkSignature = async (e) => {
    if (e) {
      e.preventDefault();
    }

    axiosPrivate({
      method: "post",
      url: `${baseUrl}api/v3/live/msdk/`,
      data: {
        meetingID: meeting.meetingId,
        role: 0,
      },
    })
      .then((res) => {
        startMeeting(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startMeeting = (signature) => {
    client
      .init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
      })
      .then(() => {
        client
          .join({
            sdkKey: meeting?.meetingMsdkKey,
            signature: signature,
            meetingNumber: meeting?.meetingId,
            password: meeting?.meetingPw,
            userName: user.user.username,
          })
          .then(() => {
            console.log("joined successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMdkSignature();
  }, [
    meeting.meetingId,
    meeting.meetingMsdkKey,
    meeting.meetingPw,
    meetingSDKElement,
    user.user.username,
  ]);

  window.addEventListener("popstate", function () {
    endZoomMeeting();
    setMeeting({
      meetingId: "",
      meetingPw: "",
      meetingMsdkKey: "",
    });
  });

  function endZoomMeeting() {
    client.leaveMeeting({
      success: function (data) {
        console.log("Leave meeting success", data);
      },
      error: function (error) {
        console.error("Leave meeting error", error);
      },
    });
  }

  return (
    <div>
      <div id="meetingSDKElement"></div>
    </div>
  );
};

export default ZoomMeetingSDK;
