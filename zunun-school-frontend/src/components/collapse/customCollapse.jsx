import { Checkbox, Collapse, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";
import { useUserMutation } from "../../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/button";

const CustomCollapse = ({
  permissionData,
  checkedList,
  setCheckedList,
  isLoading,
  userId,
  hasCancel,
}) => {
  const userMutation = useUserMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onCheckChange = (list, key) => {
    const newCheckedLists = { ...checkedList, [key]: list };
    setCheckedList(newCheckedLists);
  };
  const onCheckAllChange = (e, key) => {
    const newList = e.target.checked
      ? permissionData[key - 1]?.permissions.map(p => p.id)
      : [];
    const newCheckedLists = { ...checkedList, [key]: newList };
    setCheckedList(newCheckedLists);
  };

  const items =
    !isLoading &&
    permissionData &&
    permissionData?.map(item => ({
      key: item.id,
      label: (
        <div
          className="flex items-center w-min"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            indeterminate={
              checkedList[item.id]?.length &&
              checkedList[item.id]?.length < item.permissions?.length
            }
            onChange={e => {
              onCheckAllChange(e, item.id);
            }}
            checked={checkedList[item.id]?.length === item?.permissions?.length}
          >
            <p className="text-cyan ml-2 whitespace-nowrap">{item.name}</p>
          </Checkbox>
        </div>
      ),
      children: (
        <Checkbox.Group
          className="flex flex-col ml-4 gap-2"
          options={item?.permissions?.map(perm => ({
            label: (
              <p className="ml-2">{`${perm?.name} - ${perm?.description}`}</p>
            ),
            value: perm.id,
          }))}
          value={checkedList[item.id]}
          onChange={list => onCheckChange(list, item.id)}
        />
      ),
    }));

  const onSubmitHandler = () => {
    const values = Object?.values(checkedList)
      ?.flat()
      ?.filter(ele => ele)
      ?.sort((a, b) => a - b);
    userMutation.mutate(
      ["post", `assign-permissions/${userId}`, { permissionIds: values }],
      {
        onSuccess: () => {
          message.success("Permissions Added Successfully", [2]);
          navigate("/user");
        },
        onError: error => {
          let errorMessage = error?.response?.data?.errors?.error
            ? error?.response?.data?.errors?.error?.toString()
            : error?.message?.toString();
          message.error(errorMessage, [2]);
        },
      },
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full space-y-10"
      >
        {isLoading ? (
          <ShimmerThumbnail />
        ) : (
          <>
            <Controller
              name="permissions"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => {
                return (
                  <Collapse {...field} expandIconPosition="end" items={items} />
                );
              }}
            />
            {errors?.permissions?.type === "required" && (
              <p className="text-sm text-red">Required</p>
            )}
          </>
        )}
        {!hasCancel ? (
          <div className="flex justify-end">
            {isLoading ? (
              <div className="flex items-center">
                <ShimmerButton size="md" />
              </div>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center gap-2 h-10 px-10"
              >
                Edit Permissions
              </Button>
            )}
          </div>
        ) : (
          <div className="flex justify-between">
            {isLoading ? (
              <div className="flex items-center">
                <ShimmerButton size="md" />
              </div>
            ) : (
              <Button
                onClick={() => {
                  setCheckedList({});
                }}
                htmlType="button"
                danger
                className="flex items-center gap-2"
              >
                Cancel
              </Button>
            )}
            {isLoading ? (
              <div className="flex items-center">
                <ShimmerButton size="md" />
              </div>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center gap-2"
              >
                Assign Permissions
              </Button>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default CustomCollapse;
