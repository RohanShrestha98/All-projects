/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import CustomCollapse from "../../components/collapse/customCollapse";

const EditPermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, permissions, allPermissionsData, allPermissionsLoading } =
    location?.state || {};

  permissions?.sort((a, b) => {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

  allPermissionsData?.sort((a, b) => {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

  const permissionIds = permissions?.length && permissions?.map(p => p.id);

  const allIds = allPermissionsData?.map(item => {
    return (
      item?.permissions &&
      item?.permissions?.map(p => {
        return p.id;
      })
    );
  });

  let initialPermissions = {};
  let copyPermissionIds = permissionIds?.length && [...permissionIds];

  allIds?.forEach((subArr, index) => {
    let commonIds =
      permissionIds?.length &&
      permissionIds?.filter(item => subArr?.includes(item));
    initialPermissions[parseInt(index) + 1] = commonIds;
    copyPermissionIds =
      copyPermissionIds?.length &&
      copyPermissionIds.filter(item => !commonIds?.includes(item));
  });

  const [checkedList, setCheckedList] = useState(initialPermissions);

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  return (
    <div className="w-full mt-16 space-y-10">
      <h3 className="flex items-center gap-4">
        <ImArrowLeft2
          className="hover:cursor-pointer hover:text-cyan hover:scale-[120%]"
          onClick={() => navigate("/user")}
        />
        Edit Permissions
      </h3>

      <CustomCollapse
        permissionData={!allPermissionsLoading && allPermissionsData}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        isLoading={allPermissionsLoading}
        userId={userId}
        hasCancel={false}
      />
    </div>
  );
};

export default EditPermission;
