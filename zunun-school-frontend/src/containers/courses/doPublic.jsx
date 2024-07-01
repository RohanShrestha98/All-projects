import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Drawer, Select } from "antd";
import { useMutate } from "../../hooks/useMutateData";
import { useQueryData } from "../../hooks/useQueryData";
import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";

const DoPublic = ({ open, setOpen, sectionId, lessonId }) => {
  const onClose = () => {
    setOpen(false);
    reset();
  };
  const [forSection, setForSection] = useState(true);
  const { handleSubmit, reset, setValue } = useForm();

  const { data: dataListBySection } = useQueryData(
    ["allStudentsListBySection"],
    `api/v1/student/list/?section=${sectionId}`,
    "",
    !!sectionId,
  );
  const [selectedUsers, setSelectedUsers] = useState([]);

  const userOptions = [];
  const userList = dataListBySection?.data;
  userList?.map(item => {
    userOptions.push({
      label: item?.student?.firstName,
      value: item?.student?.id,
    });
  });

  const usePublicMutation = () =>
    useMutate(["course-public"], "/api/v1/section/public-lesson/");

  const { mutateAsync: publicMutateAsync } = usePublicMutation();

  const handleIsPublic = async () => {
    const postData = {
      section: sectionId,
      students: selectedUsers,
      lesson: lessonId,
      forSection: forSection,
    };
    try {
      const response = await publicMutateAsync(["post", "", postData]);
      if (response.success) {
        toast.success("Lesson public successfull");
      }
    } catch (err) {
      toast.error(err.response.data.errors.sync);
    }
  };

  const onChangeMultiSelect = value => {
    setSelectedUsers(value);
    setValue("students", value);
  };

  return (
    <Drawer
      title="Is public"
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(() => handleIsPublic(lessonId))}>
        <div className="space-y-6 flex flex-col">
          <div className="space-y-2">
            <div className="flex justify-between ">
              <p className="font-bold text-lg">For Section</p>
              <Checkbox
                defaultChecked={forSection}
                onChange={() => setForSection(!forSection)}
              />
            </div>
            {!forSection && (
              <section className="w-full space-y-2">
                <label className="font-semibold text-base text-gray-2">
                  User
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select user"
                  size="large"
                  // defaultValue={defaultStudents}
                  onChange={e => onChangeMultiSelect(e)}
                  options={userOptions}
                  className="w-full"
                  value={selectedUsers}
                />
              </section>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-20">
          <Button
            type="outlined"
            className="w-1/2 flex items-center justify-center"
            onClick={() => setForSection(false)}
          >
            Clear
          </Button>

          <Button type="primary" className=" w-1/2" htmlType="submit">
            {"Public"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default DoPublic;
