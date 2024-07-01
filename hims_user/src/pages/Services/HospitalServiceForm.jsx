/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useServiceDataMutation,
  // useServiceDataUpdateMutation,
} from "../../hooks/useMutateData";
import { useEffect, useState } from "react";
import {
  useAllDepartmentData,
  useSubDepartmentsAllList,
} from "../../hooks/useQueryData";
import CheckboxTreeComp from "./CheckboxTree";
import SearchSelectField from "../../components/UI/SearchSelectField";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Header from "../../components/Header";

// const validationSchema = z.object({
//   department: z.string().trim().min(1, "Department is required").max(255),
// });

export default function HospitalServiceForm() {
  const location = useLocation();
  const state = location?.state;
  const [selectedItem, setSelectedItem] = useState(
    state
      ? {
          label: state?.department,
          value: state?.idx,
        }
      : null
  );

  const navigate = useNavigate();

  const { data: departmentsData } = useAllDepartmentData();

  const { data } = useSubDepartmentsAllList(
    selectedItem?.value.toString() ?? ""
  );

  const [stateData, setStateData] = useState();

  useEffect(() => {
    setStateData(data);
  }, [data]);

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: state
      ? {
          department: state?.department,
        }
      : undefined,
  });

  const createMutation = useServiceDataMutation();
  // const updateMutation = useServiceDataUpdateMutation();

  const handleCreateServices = async () => {
    const finalData = {
      id: stateData?.id,
      sub_department: stateData?.sub_department,
      title: stateData?.title,
    };
    try {
      const reasult = await createMutation.mutateAsync(["post", "", finalData]);
      if (reasult.status === 201) {
        toast.success("Data created successfully");
        navigate("/services");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  // const handleUpdateServices = async () => {
  //   const finalData = {
  //     id: stateData?.id,
  //     sub_department: stateData?.sub_department,
  //     title: stateData?.title,
  //   };
  //   try {
  //     const reasult = await updateMutation.mutateAsync([
  //       "patch",
  //       "",
  //       finalData,
  //     ]);
  //     if (reasult.success) {
  //       toast.success("Data update successfully");
  //       navigate("/services");
  //     }
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  return (
    <div className="space-y-4">
      <Header title={"Add Service"} />
      <form
        onSubmit={handleSubmit(handleCreateServices)}
        className="rounded bg-white px-6 py-4 shadow"
      >
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-x-6 mb-6">
            <SearchSelectField
              label="Department"
              required
              placeholder="Select Department"
              name="service"
              type="select"
              className="w-1/2"
              options={departmentsData?.map(({ department }) => ({
                value: department.idx,
                label: department.title,
              }))}
              value={selectedItem}
              changeHandler={(option) => {
                setValue("department", option?.value?.toString() ?? "");
                setSelectedItem(option);
              }}
              errorMessage={errors.department?.message}
            />
          </div>

          <CheckboxTreeComp
            type="submit"
            stateData={stateData}
            setStateData={setStateData}
          />
        </section>

        <div className="mt-8 flex justify-end gap-8">
          <div className=" w-60 flex gap-2">
            <Button
              handleButtonClick={() => {
                reset();
              }}
              buttonName={"Clear"}
              className="flex items-center bg-red-600 gap-2 py-1 pl-4 pr-6 hover:opacity-80"
            />
            <Button
              handleButtonClick={() => {}}
              buttonName={state ? "Update Service" : "Create Service"}
              className="flex items-center gap-2 py-1 pl-4 pr-6 hover:opacity-80"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
