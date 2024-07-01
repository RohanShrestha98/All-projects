import { useContext, useEffect } from "react";
import { MeetingContext } from "../context/meetingContext";
import { useAuthStore } from "../../store/useAuthStore";
import { baseUrl, clientURL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import "./ZoomSDK.css";

import { ZoomMtg } from "@zoom/meetingsdk";

function ZoomSDK() {
  let { user } = useAuthStore();
  const { meeting, setMeeting } = useContext(MeetingContext);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
        console.log(res?.data);
        startMeeting(res.data.data);
        // handleUpdateStreak();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleUpdateStreak = () => {
  //   if (user && !streakUpdated) {
  //     axios.post(`${url}/user-streak?userId=${user.id}`).then(() => {
  //       setStreakUpdated(true);
  //     });
  //   }
  // };

  function startMeeting(signature) {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: clientURL,
      patchJsMedia: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: meeting?.meetingMsdkKey,
          meetingNumber: meeting.meetingId,
          passWord: meeting.meetingPw,
          userName: user.user.username,
          userEmail: user.user.email,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    if (
      meeting.meetingId &&
      meeting.meetingPw &&
      meeting.meetingMsdkKey &&
      user
    ) {
      getMdkSignature();
    } else {
      navigate("/live");
    }
  }, [meeting, user]);

  useEffect(() => {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(function (stylesheet) {
      stylesheet.parentNode.removeChild(stylesheet);
    });

    // const scripts = document.querySelectorAll("script");
    // const originalScripts = Array.from(scripts);
    // scripts.forEach(function (script) {
    //   script.parentNode.removeChild(script);
    // });

    const styles = document.querySelectorAll('style[type="text/css"]');
    const originalStyles = Array.from(styles);
    styles.forEach(function (style) {
      style.parentNode.removeChild(style);
    });

    // const newStyle = document.createElement("style");
    // newStyle.type = "text/css";
    // newStyle.innerHTML = `
    // #zmmtg-root {
    //   background-color: none;
    // }
    // #zmmtg-root .dropdown.btn-group .participants-header__participants-pop-btn.ax-outline-blue-important.dropdown-toggle.btn.btn-default,
    // #zmmtg-root .chat-header__chat-pop-btn.ax-outline-blue-important.dropdown-toggle.btn.btn-default{
    //   border: none;
    // }

    // #zmmtg-root .chat-receiver-list__receiver.dropdown-toggle.btn.btn-default{
    //   padding: 0 10px;
    // }

    // #zmmtg-root .dark-dropdown.new-LT__main-dropdown.custom-dropdown-menu.dropdown-menu{
    //     background-color: rgba(0, 0, 0, 0.8);
    // }

    // #zmmtg-root .dark-dropdown.new-LT__main-dropdown.custom-dropdown-menu.dropdown-menu li a{
    //     color: #fafbfc;
    // }

    // #zmmtg-root .meeting-info-container.meeting-info-container--left-side{
    //   display: none;
    // }
    // `;
    // document.head.appendChild(newStyle);

    const link = document.createElement("link");
    link.href = "https://source.zoom.us/2.17.0/css/bootstrap.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.href = "https://source.zoom.us/2.17.0/css/react-select.css";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link2);
      document.head.removeChild(link);
      // document.head.removeChild(newStyle);

      // stylesheets.forEach(function (stylesheet) {
      //   stylesheet.parentNode.appendChild(stylesheet);
      // });

      // originalScripts.forEach(function (script) {
      //   document.body.appendChild(script.cloneNode(true));
      // });

      originalStyles.forEach(function (style) {
        document.head.appendChild(style.cloneNode(true));
      });
    };
  }, []);

  window.addEventListener("popstate", function () {
    endZoomMeeting();
    setMeeting({
      meetingId: "",
      meetingPw: "",
      meetingMsdkKey: "",
    });
  });

  function endZoomMeeting() {
    ZoomMtg.leaveMeeting({
      success: function (data) {
        console.log("Leave meeting success", data);
      },
      error: function (error) {
        console.error("Leave meeting error", error);
      },
    });
  }

  return;
}

export default ZoomSDK;
