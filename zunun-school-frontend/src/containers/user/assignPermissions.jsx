import React, { useEffect, useState } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCategoryPermissionData } from "../../hooks/useQueryData";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import CustomCollapse from "../../components/collapse/customCollapse";

const AssignPermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, defaultPermissions, defaultPermissionsLoading } =
    location?.state || {};

  const { data, isLoading, isError, error } = useCategoryPermissionData();

  const permissionData = data?.data;
  permissionData?.sort((a, b) => {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

  defaultPermissions?.sort((a, b) => {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

  const permissionIds =
    !defaultPermissionsLoading &&
    defaultPermissions &&
    defaultPermissions?.length &&
    defaultPermissions?.map(p => p.id);

  const allIds = permissionData?.map(item => {
    return (
      item?.permissions &&
      item?.permissions?.map(p => {
        return p?.id;
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
      copyPermissionIds.filter(item => !commonIds.includes(item));
  });

  const [checkedList, setCheckedList] = useState(initialPermissions);

  if (isError) {
    message.error(error);
  }

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  return (
    <div className="w-full mt-16 space-y-10">
      <h3 className="flex items-center gap-2">
        <ImArrowLeft2 onClick={() => navigate("/user")} /> Edit Permissions
      </h3>
      <CustomCollapse
        permissionData={permissionData}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        isLoading={isLoading}
        userId={userId}
        hasCancel={true}
      />
    </div>
  );
};

export default AssignPermission;
