import React, { useEffect } from "react";
import { Input } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useFileUploadMutation } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import Uploader from "../../../components/UI/uploader";

const Identification = ({
  prevStep,
  nextStep,
  isLoading,
  data,
  setData,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const fileUploadMUtation = useFileUploadMutation();
  const [document, setDocument] = useState(
    data?.identification?.document || {
      fileName: "",
      fileType: "",
      id: "",
      url: "",
    },
  );
  const [documentUploading, setDocumentUploading] = useState(false);

  const [birthCertificate, setBirthCertificate] = useState(
    data?.identification?.birthCertificate || {
      fileName: "",
      fileType: "",
      id: "",
      url: "",
    },
  );
  const [birthCertificateUploading, setBirthCertificateUploading] =
    useState(false);

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

  const handleDocumentUpload = async e => {
    e.stopPropagation();
    const file = e.target.files[0];
    setDocumentUploading(true);
    try {
      const response = await fileUploadMUtation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setDocument(response?.data);
      setDocumentUploading(false);
    } catch (err) {
      toast.error(err?.toString());
      setDocumentUploading(false);
    }
  };

  const handleBirthCertificateUpload = async e => {
    const file = e.target.files[0];
    setBirthCertificateUploading(true);
    try {
      const response = await fileUploadMUtation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setBirthCertificate(response?.data);
      setBirthCertificateUploading(false);
    } catch (err) {
      toast.error(err?.toString());
      setBirthCertificateUploading(false);
    }
  };

  const saveData = data => {
    setData({
      ...data,
      ...((data.identification.document = document),
      (data.identification.birthCertificate = birthCertificate)),
    });
    isPreviousClick ? prevStep() : nextStep();
  };

  const handleRemoveDocument = () => {
    setDocument({ fileName: "", fileType: "", id: "", url: "" });
  };

  useEffect(() => {
    setData({
      ...data,
      identification: {
        ...data.identification,
        document: document,
      },
    });
  }, [document, setData]);

  const handleRemoveBirthCertificate = () => {
    setBirthCertificate({ fileName: "", fileType: "", id: "", url: "" });
  };

  useEffect(() => {
    setData({
      ...data,
      identification: {
        ...data.identification,
        birthCertificate: birthCertificate,
      },
    });
  }, [birthCertificate, setData]);

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Identification Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Document Id <span className="text-red">*</span>
                </label>
                <Controller
                  name="identification.documentId"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter document Id"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.identification?.documentId?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
              Document
            </label>
            <Uploader
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              id="document"
              name="identification.document"
              isUploading={documentUploading}
              file={document}
              handleRemoveFile={handleRemoveDocument}
              handleChange={handleDocumentUpload}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
              Birth Certificate
            </label>
            <Uploader
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              id="birthCertificate"
              name="identification.birthCertificate"
              isUploading={birthCertificateUploading}
              file={birthCertificate}
              handleRemoveFile={handleRemoveBirthCertificate}
              handleChange={handleBirthCertificateUpload}
            />
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
              onClick={() => {
                setIsPreviousClick(false);
              }}
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Identification;
