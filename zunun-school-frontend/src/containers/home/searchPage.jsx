import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { NavLink, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const commonRoutes = [
    "courses",
    "grades",
    "assignment",
    "calendar",
    "profile",
    "notificationSetting",
    "language",
    "/student/edit-profile",
    "privacy",
    "helpcenter",
    "customerService",
  ];

  const searchItemList = ["Profile", "Privacy", "Courses", "Assignment"];

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  const [inputText, setInputText] = useState("");
  const [searchItem, setSearchItem] = useState(searchItemList);
  const navigate = useNavigate();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, []);

  const handleChange = e => {
    setInputText(e.target.value);
    const filterSearch = searchItemList.filter(search => {
      return search.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
    if (filterSearch?.length) {
      setSearchItem(filterSearch);
    }
  };

  const handleSearch = text => {
    const filtered = commonRoutes.filter(route => {
      return route.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    if (filtered.length > 0) {
      navigate(`/${filtered[0]}`);
    }
  };

  const handleRemove = item => {
    setSearchItem(searchItem.filter(val => val === item));
  };

  return (
    <div className="pt-[18px] px-7 h-[100vh]">
      <div className="flex items-center">
        <NavLink to="/">
          <HiOutlineArrowLeft size={20} />
        </NavLink>
        <div className="flex-grow ml-[10px]">
          <Input
            onChange={handleChange}
            suffix={
              <BsSearch
                size={20}
                onClick={() => {
                  handleSearch(inputText);
                }}
              />
            }
            className="h-12 rounded-[20px]"
          />
        </div>
      </div>
      <div className="mt-6 mb-[11px] font-semibold text-[15px]">
        Recent Searches
      </div>
      {searchItem.map((item, id) => {
        return (
          <div key={id} className="flex items-center justify-between mb-[9px]">
            <div
              className="font-normal text-sm"
              onClick={() => handleSearch(item)}
            >
              {item}
            </div>
            <RxCross2
              className="cursor-pointer"
              size={10}
              onClick={() => handleRemove(item)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SearchPage;
