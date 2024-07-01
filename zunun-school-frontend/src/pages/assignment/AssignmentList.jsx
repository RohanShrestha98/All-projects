import React from "react";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactTable } from "../../components/table/table";
import { NavLink } from "react-router-dom";
import { usePermissionContext } from "../../context/permissionContext";
import MyAssignment from "./MyAssignment";
import MyAssignmentFromSection from "./MyAssignmentFromSection";
import SubmittedAssignment from "./SubmittedAssignment";
import SubmittedAssignmentFromSection from "./SubmittedAssignmentFromSection";
import GradedAssignment from "./GradedAssignment";
import GradedAssignmentFromSection from "./GradedAssignmentFromSection";

export default function AssignmentList() {
  const navigate = useNavigate();
  const [active, setactive] = useState("myAssignment");
  const location = useLocation();
  const { permissions } = usePermissionContext().permissions;
  const assignmentPermission = permissions
    .filter(each => each.url.path.includes("assignment"))
    .map(each => each.url.path);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          {location.state?.id && (
            <button
              className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
              onClick={() => navigate(-1)}
            >
              <BiArrowBack size={16} />
            </button>
          )}

          <h2 className="text-xl md:text-lg font-bold sm:font-medium sm:text-base">
            Assignment List
          </h2>

          {assignmentPermission.includes("/assignment/create/") ||
          permissions[0].name === "Any" ? (
            <NavLink
              to={"/assignment/add"}
              className="border border-blue  px-4 py-[2px] rounded-md bg-blue text-white hover:bg-white hover:text-blue"
            >
              Create Assignment
            </NavLink>
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <p
            className={
              active === "myAssignment"
                ? "px-5  cursor-pointer bg-blue border-blue text-white border rounded-3xl inline-block"
                : "px-5  text-gray-6 border-gray-6 cursor-pointer border rounded-3xl inline-block"
            }
            onClick={() => setactive("myAssignment")}
          >
            My Assignment
          </p>
          <p
            className={
              active === "submitted"
                ? "px-5  bg-blue border-blue text-white cursor-pointer border rounded-3xl inline-block"
                : "px-5  text-gray-6 border-gray-6 cursor-pointer border rounded-3xl inline-block"
            }
            onClick={() => setactive("submitted")}
          >
            Submitted
          </p>
          <p
            className={
              active === "graded"
                ? "px-5   bg-blue border-blue text-white cursor-pointer border rounded-3xl inline-block"
                : "px-5  text-gray-6 border-gray-6 cursor-pointer border  rounded-3xl inline-block"
            }
            onClick={() => setactive("graded")}
          >
            Graded
          </p>
        </div>
        {active === "myAssignment" && !location?.state?.id ? (
          <>
            <MyAssignment active={"myAssignment"} />
          </>
        ) : active === "myAssignment" && location?.state?.id ? (
          <>
            <MyAssignmentFromSection
              active={"myAssignment"}
              location={location?.state?.id}
            />
          </>
        ) : active === "submitted" && !location?.state?.id ? (
          <>
            <SubmittedAssignment active={"submitted"} />
          </>
        ) : active === "submitted" && location?.state?.id ? (
          <>
            <SubmittedAssignmentFromSection
              active={"submitted"}
              location={location?.state?.id}
            />
          </>
        ) : active === "graded" && !location?.state?.id ? (
          <>
            <GradedAssignment active={"graded"} />
          </>
        ) : active === "graded" && location?.state?.id ? (
          <>
            <GradedAssignmentFromSection
              active={"graded"}
              location={location?.state?.id}
            />
          </>
        ) : (
          <ReactTable loading={false} error={true} data={[]} />
        )}
      </div>
    </>
  );
}
