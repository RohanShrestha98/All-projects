import { Dropdown, Switch, message } from "antd";
import { AiFillCaretDown } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";
import { useUserMutation } from "../../hooks/useMutateData";
import { usePermissionContext } from "../../context/permissionContext";
import { useCategoryPermissionData } from "../../hooks/useQueryData";

const StaffTableActions = ({ data, hasCommonRole }) => {
  const { permissions } = usePermissionContext().permissions;
  const userPermission = permissions
    .filter(each => each.url.path.includes("user"))
    .map(each => each.url.path);

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isError,
    error,
  } = useCategoryPermissionData();

  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/user/editUser"
          state={{
            userId: data && data.id,
            userData: data && data,
          }}
        >
          Edit Staff{" "}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/user/editPermission"
          state={{
            userId: data && data?.id,
            permissions: data?.permissions ?? [],
            role: data && data?.role,
            allPermissionsData: allPermissionsData?.data,
            allPermissionsLoading: allPermissionsLoading,
          }}
        >
          Edit Permission
        </Link>
      ),
    },
  ];

  const userMutation = useUserMutation();

  const handleToggleStatus = () => {
    userMutation.mutate(["patch", `toggle-status/${data.id}`, ""], {
      onSuccess: () => {
        data?.isActive
          ? message.success("Staff account deactivated successully", [2])
          : message.success("Staff account activated successfully", [2]);
      },
      onError: error => {
        let errorMessage = error?.response?.data?.errors?.error
          ? error?.response?.data?.errors?.error?.toString()
          : error?.message?.toString();
        message.error(errorMessage);
      },
    });
  };

  if (isError) {
    message.error(error);
  }

  return (
    <section className="flex items-center justify-center gap-4">
      {(userPermission.includes("/user/toggle-status/") ||
        permissions[0].name === "Any") && (
        <Switch
          onChange={handleToggleStatus}
          checked={data?.isActive}
          className="bg-gray-2 "
        />
      )}

      {(userPermission.includes("/user/update/") ||
        permissions[0].name === "Any") && (
        <Dropdown
          menu={{
            items,
          }}
          trigger={[!hasCommonRole && "hover"]}
        >
          <a
            onClick={e => !hasCommonRole && e.preventDefault()}
            className={`flex items-center ${
              hasCommonRole ? "text-gray-dark3" : "hover:text-cyan"
            } hover:cursor-pointer `}
          >
            <AiFillCaretDown className="h-4 w-4" />
          </a>
        </Dropdown>
      )}
    </section>
  );
};

export default StaffTableActions;
