import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { usePermissionContext } from "../../context/permissionContext";
import { useAuthContext } from "../../context/authContext";
import { Dropdown, Menu } from "antd";
import { IoIosArrowDown } from "react-icons/io";

const NavLinkContents = ({ isOpen, pathName, setPathName }) => {
  const navItems = [
    // { title: "Home", link: "/" },
    { title: "My Course", link: "/courses" },
    { title: "Assignment", link: "/assignment" },
    { title: "Calendar", link: "/calendar" },
    { dropdown: true, title: "Staff", link: "/user" },
    { dropdown: true, title: "Grade", link: "/grade" },
    { dropdown: true, title: "Section", link: "/section" },
    { dropdown: true, title: "Student", link: "/student" },
    { title: "Grading criteria", link: "/grading-criteria" },
    { title: "Cycle", link: "/cycle" },
  ];
  const { auth } = useAuthContext();
  const { permissions } = usePermissionContext().permissions;
  const [authorizedNav, setAuthorizedNav] = useState(navItems);

  useEffect(() => {
    const accessibleSides = [
      ...new Set(permissions?.map(each => each.url.path.split("/")[1])),
    ];

    if (permissions && permissions[0].name === "Any") {
      setAuthorizedNav(navItems);
    } else if (auth?.user?.role?.id === 5) {
      setAuthorizedNav([
        { title: "Home", link: "/" },
        { title: "My Course", link: "/courses" },
        { title: "Assignment", link: "/assignment" },
        { title: "Calendar", link: "/calendar" },
        // { title: "Notes", link: "/notes" },
      ]);
    } else {
      setAuthorizedNav(
        navItems.filter(
          item =>
            accessibleSides.includes(item.link.split("/")[1]) ||
            item.link === "/" ||
            item.link === "/calendar" ||
            item.link === "/courses",
        ),
      );
    }
  }, []);

  const filterAuthorizedNav = authorizedNav?.filter(
    item => item.dropdown !== true,
  );
  const filterAuthorizedNavDropdown = authorizedNav?.filter(
    item => item.dropdown === true,
  );

  const filterGradeSection = filterAuthorizedNavDropdown.some(
    item => item.link === "/grade" || item.link === "/section",
  );
  const filterStudentStaff = filterAuthorizedNavDropdown.some(
    item => item.link === "/student" || item.link === "/user",
  );

  const GradeSectionMenu = () => {
    const gradeSection = [
      {
        key: "1",
        label: (
          <Link onClick={() => setPathName("/grade")} to={"/grade"}>
            Grade
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link onClick={() => setPathName("/section")} to={"/section"}>
            Section
          </Link>
        ),
      },
    ];

    return (
      <Menu>
        {gradeSection.map(({ key, label }) => (
          <Menu.Item key={key}>{label}</Menu.Item>
        ))}
      </Menu>
    );
  };

  const UsersMenu = () => {
    const users = [
      {
        key: "1",
        label: (
          <Link onClick={() => setPathName("/user")} to={"/user"}>
            Staff
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link onClick={() => setPathName("/student")} to={"/student"}>
            Student
          </Link>
        ),
      },
    ];

    return (
      <Menu>
        {users.map(({ key, label }) => (
          <Menu.Item key={key}>{label}</Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div
      className={
        isOpen ? " flex-col" : " sm:hidden flex overflow-auto  gap-9 ml-4"
      }
    >
      {filterAuthorizedNav?.map(({ title, link }, id) => (
        <NavLink
          key={id}
          to={link}
          exact="true"
          onClick={() => setPathName(link)}
          className={({ isActive }) =>
            isActive ? "text-blue-light" : "text-gray-dark"
          }
        >
          <span className="flex items-center lg:space-y-10 font-[800]">
            <p className="text-base whitespace-nowrap">{title}</p>
          </span>
        </NavLink>
      ))}
      {filterGradeSection && (
        <Dropdown
          overlay={<GradeSectionMenu />}
          placement="bottomLeft"
          className="flex justify-end"
        >
          <p
            className={`cursor-pointer flex items-center gap-1 ${
              pathName === "/section" || pathName === "/grade"
                ? "text-blue-light"
                : "text-gray-dark"
            }  text-base font-[800]`}
          >
            Class <IoIosArrowDown />
          </p>
        </Dropdown>
      )}
      {filterStudentStaff && (
        <Dropdown
          overlay={<UsersMenu />}
          placement="bottomLeft"
          className="flex justify-end"
        >
          <p
            className={`cursor-pointer flex  items-center ${
              pathName === "/user" || pathName === "/student"
                ? "text-blue-light"
                : "text-gray-dark"
            }  gap-1  text-base font-[800]`}
          >
            User <IoIosArrowDown />
          </p>
        </Dropdown>
      )}
    </div>
  );
};

export default NavLinkContents;
