import React from "react";

type PropsType = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Icon: React.FC<PropsType> = ({ className, onClick }) => {
  return (
    <div>
      <i className={className} onClick={onClick}></i>
    </div>
  );
};

export default Icon;
