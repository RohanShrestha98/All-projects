import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import { UploadContextType, IError, IValues } from "../@types/uploadContext";

import http from "../utils/http";

import config from "../config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const contentApi = config.endpoints.api.content;

export const UploadContext = createContext<UploadContextType>(
  {} as UploadContextType
);

type Props = {
  children: React.ReactNode;
};

export const UploadProvider: React.FC<Props> = ({ children }) => {
  const {t} = useTranslation();
  // const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<IValues | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadQueue, setUploadQueue] = useState<IValues[]>([]);

  const [log, setLog] = useState<IValues[]>([]);
  const [temp, setTemp] = useState<IValues | null>(null);

  const [error, setError] = useState<IError>({
    status: false,
    message: ""
  });

  const alreadyAvailableNames: string[] = [];
  for (let i = 0; i < log.length; i++) {
    alreadyAvailableNames.push(log[i]?.file?.name as string);
  }
  for (let i = 0; i < uploadQueue.length; i++) {
    alreadyAvailableNames.push(uploadQueue[i]?.file?.name as string);
  }
  alreadyAvailableNames.push(temp?.file.name! as string);

  const uploadFile = async (data, editfrom) => {
    setValue(data);
    setIsEditing(editfrom);
    if (!editfrom) {
      if (alreadyAvailableNames.includes(data?.file.name!)) {
        setError({
          status: true,
          message: "Provided File Name Already Exists"
        });
        return;
      }
    }
    if (uploadQueue === undefined) {
      setUploadQueue([data!]);
    } else {
      setUploadQueue([...uploadQueue, data!]);
    }
  };

  useEffect(() => {
    const func = async () => {
      if (uploadQueue !== undefined && uploadQueue.length > 0) {
        if (!uploading) {
          const temporary = uploadQueue.shift();
          setTemp(temporary!);
          setUploading(true);
          try {
            if (temporary?.file) {
              uploadFunction(temporary);
            } else {
              finalUploadContent().then(() => {
                setUploading(false);
                setTemp(null);
              });
            }
          } catch (err) {
            setUploading(false);
          }
        }
      }
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log, temp, uploadQueue, uploading]);

  async function uploadFunction(temporary) {
    try {
      const formData = new FormData();
      formData.append("video", temporary.file);
      toast.success(
        `${t("your_upload_has_been_queued")}`
      );

      const res = await axios.post(
        "http://192.168.1.71:1234/api/video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            const progressPercentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progressPercentage);
          }
        }
      );
      setLog([...log, temporary]);
      await finalUploadContent();
    } catch (err) {
      toast.error(t("something_went_wrong"));
    } finally {
      setUploading(false);
      setTemp(null);
    }
  }

  async function finalUploadContent() {

    // let link = "";
    // switch (isEditing) {
    //   case true:
    //     link = `${contentApi.update(value.module_id)}/${value.id}/`;
    //     break;
    //   case false:
    //     link = contentApi.create(value.module_id);
    //     break;
    //   default:
    // }
    const filename = value?.file?.name.split(" ").join("_");
    try {
      // const data = {
      //   title: value?.module_id,
      //   chapterId: value?.chapterId,
      //   subjectId: value?.subjectId,
      //   unitId: value?.unitId,
      //   title: value?.title,
      //   description: value?.description,
      //   visibility: value?.visibility,
      //   length: value?.length,
      //   level: value?.level,
      //   premium: value?.premium,
      //   thumbnail: value?.thumbnail,
      //   link: value?.file
      //     ? `http://192.168.1.71:1234/api/video/course-video/${filename}`
      //     : value?.link
      // };
      const formData = new FormData();
      formData.append("title", value?.title!);
      formData.append("description", value?.description!);
      formData.append("instruction", value?.instruction!);
      formData.append("contentType", value?.contentType!);
      formData.append("bloomsTaxonomyLevel", value?.bloomTaxonomyLevel!);
      if (value?.file !== undefined) {
        formData.append(
          "link",
          `http://192.168.1.71:1234/api/video/course-video/${filename}`
        );
      } else {
        formData.append("link", value?.link!);
      }
      http.POST(contentApi.create, formData);
    } catch (err) {
      toast.error(err.response.data.message.error || t("something_went_wrong"));
    } finally {
      toast.success(t("your_upload_has_been_completed"));
      setProgress(0);
    }
  }

  return (
    <UploadContext.Provider
      value={{
        value,
        setValue,
        uploadFile,
        progress,
        setProgress,
        uploadQueue,
        log,
        temp,
        error,
        isEditing,
        setIsEditing
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => useContext(UploadContext);
