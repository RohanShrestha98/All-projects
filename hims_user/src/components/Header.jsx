/* eslint-disable react/prop-types */
import { IoNotifications } from "react-icons/io5";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useProfileInfoData } from "../hooks/useQueryData";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuthContext } from "../context/authContext";

export default function Header({ title, className, isBack }) {
  const { data } = useProfileInfoData();
  const personalInfo = data?.results?.[0];
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center justify-between mb-3 sm:mb-1 sm:sticky top-0 sm:py-2  sm:bg-white ${className}`}
    >
      <div className="flex items-center gap-2">
        {isBack && (
          <div className="min-w-[20px] ">
            <IoArrowBackOutline
              size={20}
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>
        )}

        <p className="text-lg font-medium text-gray-500 sm:text-sm line-clamp-1">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <IoNotifications
          onClick={() => navigate("/notification")}
          size={22}
          className="text-gray-400 cursor-pointer"
        />
        <Link to={"/profile"} className="flex items-center gap-2">
          <img
            className="min-w-[32px] w-8  min-h-[32px] h-8  rounded-full "
            src={personalInfo?.user?.avatar_url ?? logo}
            alt=""
          />
          <div className="sm:hidden">
            <h1 className="text-[#374858] font-semibold text-sm">
              {personalInfo?.user?.first_name}
              <span className="ml-2">{personalInfo?.user?.last_name}</span>{" "}
            </h1>
            <p className="text-[#808080] text-[11px]">
              {auth?.user?.roles?.[0]}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
