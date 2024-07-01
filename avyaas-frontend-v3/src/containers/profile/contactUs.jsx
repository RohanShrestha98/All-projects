import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const items = [
    {
      item: "Customer Service",
      to: "/customerService",
    },
    {
      item: "Whatsapp",
    },
    {
      item: "Website",
    },
    {
      item: "Facebook",
    },
    {
      item: "Twitter",
    },
    {
      item: "Instagram",
    },
  ];

  return (
    <div className="mt-7">
      {items.map((item, id) => {
        return (
          <Link to={item.to} key={id}>
            <div className="flex items-center h-[72px] pl-5 bg-white mb-6 rounded-[20px]">
              <div className="ml-5 text-black-gray font-bold text-lg">
                {item.item}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ContactUs;
