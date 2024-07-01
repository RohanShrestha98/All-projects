
import googlePlay from "../assets/googlePlay.svg";
import appStore from "../assets/appStore.svg";
import { Link, Outlet } from "react-router-dom";
import login from "../assets/login.svg";

const AuthLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="flex  sm:items-center sm:justify-center sm:p-0">
        <div className="bg-[#D9E8FD] flex flex-col px-[150px] lg:px-8 md:px-6 sm:px-3 pt-[70px] gap-3  w-1/2">
          <img src={login} alt="" />
          <div className="flex gap-4 tracking-tighter">
            <p className="text-xl font-semibold text-[#4D4D4D]  ">
              Get started with <span className="text-[#4365a7]">ebidhya</span>{" "}
              and embrace your learning experience
            </p>
          </div>
          <p className="text-sm text-[#666]">
            Learn from video courses by top instructors. Participate in Live
            tests, Discussions and Polls inside the app.
          </p>
          <div className="flex flex-col">
            <p className=" flex text-sm text-[#808080] uppercase rounded-md ">
              download app
            </p>
            <div className="flex gap-2">
              <Link to="https://play.google.com/store">
                <img
                  src={googlePlay}
                  alt="googleplay"
                  className="h-16 w-36 sm:h-16 sm:w-50 max-w-full"
                />
              </Link>
              <Link to="https://www.apple.com/store">
                <img
                  src={appStore}
                  alt="appstore"
                  className="h-16 w-36 sm:h-16 sm:w-50 max-w-full"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-full w-1/2 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
