import React, { useState } from "react";
import { Drawer } from "antd";
import NavLinkContnents from "./navLinkContents";
import { HamburgerSvg } from "../../assets/allSvg";

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
      <HamburgerSvg onClick={showDrawer} />
      <Drawer
        placement="left"
        onClose={onClose}
        keyboard={true}
        maskClosable={true}
        open={open}>
        <NavLinkContnents isOpen={open} />
      </Drawer>
    </div>
  );
};

export default NavDrawer;
