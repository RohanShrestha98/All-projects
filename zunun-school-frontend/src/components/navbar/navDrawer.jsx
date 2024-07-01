import React, { useState } from "react";
import { Drawer } from "antd";
import NavLinkContnents from "./navLinkContents";
import { GiHamburgerMenu } from "react-icons/gi";

const NavDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="lg:block hidden sm:hidden">
      <GiHamburgerMenu onClick={showDrawer} />
      <Drawer
        placement="left"
        onClose={onClose}
        keyboard={true}
        maskClosable={true}
        open={open}
      >
        <NavLinkContnents isOpen={open} />
      </Drawer>
    </div>
  );
};

export default NavDrawer;
