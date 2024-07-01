import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { AiOutlineRight } from "react-icons/ai";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerBadge,
} from "react-shimmer-effects";
import LeftMenu from "../../containers/profile/leftMenu";
import profileImg from "../../assets/images/blogImg1.png";
import editImg from "../../assets/images/edit.png";
import bellImg from "../../assets/images/bell.png";
import helpcenterImg from "../../assets/images/helpcenter.png";
import languageImg from "../../assets/images/language.png";
import lockImg from "../../assets/images/lock.png";
import securityImg from "../../assets/images/security.png";
import eyeImg from "../../assets/images/eye.png";
import logoutImg from "../../assets/images/logout.png";
import LogOutModal from "../../containers/profile/logOutModal";
import { ThemeContext, themes } from "../../context/themeContext";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { useAuthContext } from "../../context/authContext";
import dayjs from "dayjs";
import { useQueryData } from "../../hooks/useQueryData";

const navItems = [
  { title: "Notification", link: "/notificationSetting", image: bellImg },
  { title: "Security", link: "/security", image: securityImg },
  { title: "Language", link: "/language", image: languageImg, isLang: true },
  { title: "Dark Mode", image: eyeImg, isDarkMode: true },
  { title: "Privacy Policy", link: "/privacy", image: lockImg },
  { title: "Help Center", link: "/helpcenter", image: helpcenterImg },
];

const MyProfile = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [initial, setInitial] = useState(true);

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ? true : false,
  );

  const { auth } = useAuthContext();
  const useStudentProfileDetail = () =>
    useQueryData(
      ["student_profile"],
      `api/v1/${auth?.user?.role?.id === 5 ? "student" : "user"}/profile/${
        auth?.user?.id
      }`,
    );

  const { data: profileData } = useStudentProfileDetail();
  const profileDetails = profileData && profileData?.data;

  const studentDetail = [
    {
      title: "Name",
      desc: `${
        profileDetails?.student?.firstName || profileDetails?.student?.surname
          ? profileDetails?.student?.firstName +
            " " +
            profileDetails?.student?.surname
          : "-"
      } `,
    },
    {
      title: "Nickname",
      desc: `${
        profileDetails?.student?.username || profileDetails?.username || "-"
      } `,
    },
    {
      title: "Date of Birth",
      desc: ` ${
        profileDetails?.student?.dob
          ? dayjs(profileDetails?.student?.dob).format().slice(0, 10)
          : "-"
      }`,
    },
    { title: "Phone", desc: `${profileDetails?.student?.homePhone || "-"}` },
    { title: "Cellular", desc: `${profileDetails?.student?.cellular || "-"}` },
    {
      title: "Email",
      desc: `${profileDetails?.student?.email || profileDetails?.email || "-"}`,
    },
    {
      title: "Gender",
      desc: `${profileDetails?.student?.gender || "-"}`,
    },
  ];

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);

  const ProfileTop = () => {
    const items = [
      {
        no: 5,
        status: "Completed",
      },
      {
        no: 3,
        status: "Ongoing",
      },
      {
        no: 4,
        status: "Completed",
      },
      {
        no: 2,
        status: "Ongoing",
      },
    ];


    return (
      <div className="flex md:block">
        <div className="text-2xl font-bold w-full px-6 sm:bg-white sm:shadow-sm sm:z-[1000] sm:fixed sm:top-0 sm:pt-7 sm:pb-3 sm:block hidden">
          Profile
        </div>
        <div className="flex items-start gap-20 ">
          <div className="text-center  sm:mt-24">
            <div className="flex justify-center">
              {initial ? (
                <ShimmerCircularImage size={150} />
              ) : (
                <img
                  src={profileDetails?.student?.file?.url ?? profileImg}
                  alt="img"
                  className="max-w-[140px] min-w-[140px] 
                      max-h-[140px] min-h-[140px] rounded-full mb-2 object-cover object-top"
                />
              )}
            </div>
            {initial ? (
              <div className="flex justify-center">
                <div className="w-40">
                  <ShimmerText line={1} />
                </div>
              </div>
            ) : (
              <div className="font-bold text-[18px] flex items-center justify-center text-black-gray mb-1 dark:text">
                {profileDetails?.student?.firstName}{" "}
                {profileDetails?.student?.surname}
              </div>
            )}
            {initial ? (
              <div className="flex justify-center">
                <div className="w-32">
                  <ShimmerText line={1} />
                </div>
              </div>
            ) : (
              <div className="font-semibold text-[15px] text-gray-2 mb-4">
                {profileDetails?.student?.role?.name}
              </div>
            )}
            {auth?.permissions?.[0]?.name !== "Any" && profileDetails?.role?.id === 5 && (
              <div className="flex justify-center items-center">
                {initial ? (
                  <ShimmerBadge />
                ) : (
                  <div
                    onClick={() => {
                      navigate("/student/edit-profile", {
                        state: { data: profileDetails, edit: true },
                      });
                    }}
                    className="flex justify-center cursor-pointer items-center w-[134px] h-[34px] border border-black rounded-[100px] mb-5"
                  >
                    <img
                      src={editImg}
                      alt="img"
                      className="mr-[10.84px] inline-block"
                    />
                    <p className="font-bold text-[13px]">Edit Profile</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="flex gap-7 lg:gap-3 md:gap-1 justify-around text-center 
                    border-0  py-0
                    sm:border-t sm:border-b mt-10 sm:border-t-white-gray
                    sm:border-b-white-gray lg:ml-4
                    md:ml-0 md:mt-6  md:py-4 "
          >
            {items.map((item, id) => {
              return (
                <div
                  className=" bg-[#fafaf7] rounded-2xl p-4 shadow min-w-[110px]"
                  key={id}
                >
                  {initial ? (
                    <div className="w-6">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <div className="mb-2 font-bold text-2xl text-gray-3">
                      {item.no}
                    </div>
                  )}
                  {initial ? (
                    <div className="w-10">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <div className="font-semibold text-[15px] text-gray-3">
                      {item.status}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col ">
      {/* <p className="font-bold text-3xl block sm:hidden md:pl-3">Profile</p> */}
      <div className="flex gap-20 sm:block">
        <div className="min-w-fit block sm:hidden">
          <LeftMenu initial={initial} />
        </div>
        <div className="w-[80%]  sm:w-[100%] sm:ml-0">
          <ProfileTop />
          <div className="grid grid-cols-2 sm:hidden mt-4 bg-[#f8f8f2] px-3 py-4">
            {studentDetail.map((std, id) => {
              return (
                <div key={id} className="flex mb-4 font-semibold text-[15px]">
                  <div className="mb-2 w-[30%] md:w-[40%]">
                    {initial ? <ShimmerText line={1} /> : std.title}
                  </div>
                  <div className="text-gray-2 flex-grow">
                    {initial ? (
                      <div className="ml-10 w-[60%]">
                        <ShimmerText line={1} />
                      </div>
                    ) : (
                      std.desc
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hidden mt-8 sm:block">
            {navItems.map((navItem, id) => {
              return (
                <NavLink key={id} to={navItem.link} exact="true">
                  <div className="flex justify-between items-center mb-5 text-black-gray px-6 pb-4">
                    <div>
                      {!initial && (
                        <img
                          src={navItem.image}
                          alt="img"
                          className="w-3.5 h-3.5 inline-block"
                        />
                      )}
                      {!initial && (
                        <span className="ml-4 text-sm font-semibold">
                          {navItem.title}
                        </span>
                      )}
                    </div>
                    {!initial && (
                      <div>
                        {navItem.isLang ? (
                          <div className="flex items-center">
                            <div className="mr-2 font-semibold text-sm text-black-gray">
                              {localStorage.getItem("language") ??
                                "English(US)"}
                            </div>
                            <AiOutlineRight />
                          </div>
                        ) : navItem.isDarkMode ? (
                          <div>
                            <ThemeContext.Consumer>
                              {({ changeTheme }) => (
                                <Switch
                                  checked={isDark}
                                  onClick={() => {
                                    setIsDark(!isDark);
                                    changeTheme(
                                      isDark ? themes.light : themes.dark,
                                    );
                                  }}
                                />
                              )}
                            </ThemeContext.Consumer>
                          </div>
                        ) : (
                          <AiOutlineRight />
                        )}
                      </div>
                    )}
                  </div>
                </NavLink>
              );
            })}
            {!initial && (
              <div
                className="mb-5 px-[26px] text-black-gray  cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <img
                  src={logoutImg}
                  alt="img"
                  className="w-3.5 h-3.5 inline-block"
                />
                <span className="ml-2 text-sm font-semibold text-red-1">
                  Logout
                </span>
              </div>
            )}
            <LogOutModal isOpen={modalOpen} setOpen={setModalOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
