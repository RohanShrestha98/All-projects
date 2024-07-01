import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import {
  useFileUploadMutation,
  useStudentProfileMutation,
} from "../../../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import toast from "../../../utils/toast";
import Uploader from "../../../components/UI/uploader";

const EducationHistory = ({
  prevStep,
  isLoading,
  data,
  profileImage,
  setData,
  edit,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const navigate = useNavigate();
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const studentProfileMutation = useStudentProfileMutation();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const { auth, setAuth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  const fileUploadMutation = useFileUploadMutation();
  const [lastEstablishment, setLastEstablishment] = useState(
    data?.educationHistory?.lastEstablishment,
  );
  const [lastGrade, setLastGrade] = useState(data?.educationHistory?.lastGrade);
  const [certificate, setCertificate] = useState(
    data?.educationHistory?.certificate || {
      fileName: "",
      fileType: "",
      id: "",
      url: "",
    },
  );

  const [certificateUploading, setCertificateUploading] = useState(false);

  const saveData = () => {
    setData({
      ...data,
      educationHistory: {
        lastGrade: lastGrade,
        lastEstablishment: lastEstablishment,
        certificate: certificate,
      },
    });
    isPreviousClick && prevStep();
  };

  const handleClickSubmit = async formData => {
    const postData = {
      ...formData,
      student: { ...data?.student, file: profileImage },
    };

    try {
      const result = await studentProfileMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `update/${formData?.student?.id}` : "create",
        {
          ...postData,
          grade: postData?.grade?.value ?? postData?.grade,
          educationHistory: {
            lastGrade: lastGrade,
            lastEstablishment: lastEstablishment,
            certificate: certificate,
          },
        },
      ]);
      if (result?.success) {
        message.success(
          edit
            ? "Student Profile updated successfully"
            : "Added Student Successfully",
        );
        isStudent ? navigate("/profile") : navigate("/student");
        const updatedAuthState = {
          ...auth,
          user: {
            ...auth.user,
            username: postData?.student?.username,
          },
        };
        setAuth(updatedAuthState);
      }
    } catch (error) {
      message.error(Object.values(error?.response?.data?.errors)?.[0]);
    }
  };

  const handleCertificateUpload = async e => {
    const file = e.target.files[0];
    setCertificateUploading(true);
    try {
      const response = await fileUploadMutation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setCertificate(response?.data);
      setCertificateUploading(false);
    } catch (err) {
      toast.error(err?.toString());
      setCertificateUploading(false);
    }
  };

  const handleRemoveCertificate = () => {
    setCertificate({ fileName: "", fileType: "", id: "", url: "" });
  };

  useEffect(() => {
    setData({
      ...data,
      educationHistory: {
        ...data.educationHistory,
        certificate: { fileName: "", fileType: "", id: "", url: "" },
      },
    });
  }, [certificate, setData]);

  return (
    <div className="w-full mt-10">
      <form
        onSubmit={
          isPreviousClick
            ? handleSubmit(() => saveData())
            : handleSubmit(formData => handleClickSubmit(formData))
        }
        className="flex flex-col gap-4"
      >
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Education&apos;s History Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Last Establishment <span className="text-red">*</span>
                </label>
                <Controller
                  name="educationHistory.lastEstablishment"
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={() => (
                    <Input
                      placeholder="Enter last establishment date"
                      onChange={e => {
                        setLastEstablishment(e.target.value);
                      }}
                      value={lastEstablishment}
                    />
                  )}
                />
                {errors?.educationHistory?.lastEstablishment?.type ===
                  "required" && <p className="text-sm text-red">Required</p>}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Last Grade <span className="text-red">*</span>
                </label>
                <Controller
                  name="educationHistory.lastGrade"
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={() => (
                    <Input
                      placeholder="Enter last grade"
                      onChange={e => {
                        setLastGrade(e.target.value);
                      }}
                      value={lastGrade}
                    />
                  )}
                />
                {errors?.educationHistory?.lastGrade?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Certificate
                </label>
                <Uploader
                  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                  isUploading={certificateUploading}
                  id="certificate"
                  file={certificate}
                  handleRemoveFile={handleRemoveCertificate}
                  handleChange={handleCertificateUpload}
                />
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-start-1 col-span-2 justify-center items-center  rounded-ful">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(true);
              }}
              type="back"
              className="flex col-start-1 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              <ImArrowLeft2 /> Prev
            </button>
          )}
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-centertext-white rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              {edit ? "Update" : "Submit"} <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EducationHistory;
