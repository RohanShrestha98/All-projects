import React, { useState } from "react";
import ToggleUnit from "./ToggleUnit";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../../components/UI/button";
import { useLocation, useNavigate } from "react-router-dom";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import ErrorPage from "../../components/errorPage/errorPage";
import { useNoteByCourseData } from "../../hooks/useQueryData";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import ConfirmModel from "../../containers/profile/confirmModel";
import { BiArrowBack } from "react-icons/bi";

export default function Notes() {
  const location = useLocation();
  const [notes, setNotes] = useState();
  const [edit, setEdit] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editSelectedId, setEditSelectedId] = useState("");
  const [deleteSelectedId, setDeleteSelectedId] = useState("");
  const useNoteUpdateMutation = () =>
    useMutate(["noteByCourse"], `api/v1/notes/update/${editSelectedId}`);
  const useNoteDeleteMutation = () =>
    useMutate(["noteByCourse"], `api/v1/notes/delete/${deleteSelectedId}`);
  const { mutateAsync: mutateNoteAsync } = useNoteUpdateMutation();
  const { mutateAsync: mutateDeleteNoteAsync } = useNoteDeleteMutation();

  const {
    data: noteByCourseData,
    isError: notesError,
    isLoading: notesLoading,
  } = useNoteByCourseData({ courseId: location?.state?.id });

  const startNoteData =
    noteByCourseData?.data?.units?.[0]?.lessons?.[0]?.contents?.[0]?.notes;
  const startContentDataTitle =
    noteByCourseData?.data?.units?.[0]?.lessons?.[0]?.contents?.[0]?.name;
  const noteData = notes?.notes ?? startNoteData;
  const navigate = useNavigate();

  const handlesetEditedValue = value => {
    if (value === "<p><br></p>") {
      setEditedValue("");
    } else {
      setEditedValue(value);
    }
  };

  const handleUpdate = async () => {
    try {
      const postData = {
        courseId: location?.state?.courseId,
        note: editedValue,
      };
      const response = await mutateNoteAsync(["patch", "", postData]);
      if (response.success) {
        setEdit(false);
        toast.success("Note Update successfully");
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await mutateDeleteNoteAsync(["delete", ""]);
      if (response.success) {
        setConfirmModel(false);
        toast.success("Note Delete Successfully");
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };
  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button
            className="text-base mb-4 flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 py-1"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack size={16} />
          </button>
          <div className="font-bold text-2xl mb-4 ">Notes</div>
        </div>

        <Button
          type="primary"
          className="w-[140px] font-semibold"
          htmlType="submit"
        >
          {"Download"}
        </Button>
      </div>
      {noteByCourseData?.data && (
        <div className="flex gap-8">
          <div className=" w-[30%]  overflow-x-scroll">
            {noteByCourseData?.data?.units?.map(item => {
              return (
                <div key={item?.id}>
                  <ToggleUnit
                    name={item?.name}
                    notes={noteData}
                    lessons={item?.lessons}
                    setNotes={setNotes}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-[70%] h-full bg-white px-7 py-6 rounded">
            <h1 className="font-bold font-base text-[#686868]">
              {ConvertHtmlToPlainText(notes?.name ?? startContentDataTitle)}
            </h1>
            <p className="font-medium text-sm">
              {noteData?.length} {noteData?.length < 2 ? "note" : "notes"}{" "}
            </p>
            <div className="border-b border-gray-dark3 mt-3"></div>
            {noteData?.map(item => {
              return (
                <div key={item?.id}>
                  <div className="mt-4">
                    <div className="flex items-start justify-between w-full rounded bg-[#F6F6F6] p-4">
                      {edit && editSelectedId === item?.id ? (
                        <ReactQuill
                          onChange={e => handlesetEditedValue(e)}
                          className="bg-white w-full max-w-[400px]"
                          defaultValue={item?.note}
                        />
                      ) : (
                        <h1
                          className="max-w-[90%] overflow-x-scroll"
                          dangerouslySetInnerHTML={{ __html: item?.note }}
                        ></h1>
                      )}
                      <div className="flex flex-col justify-between gap-2">
                        <div className="flex gap-3">
                          {edit && item?.id === editSelectedId ? (
                            <FaCheck
                              onClick={() => handleUpdate()}
                              className="text-green cursor-pointer"
                            />
                          ) : (
                            <FaEdit
                              onClick={() => {
                                setEdit(true);
                                setEditSelectedId(item?.id);
                              }}
                              className="text-blue cursor-pointer"
                            />
                          )}

                          <FaTrash
                            onClick={() => {
                              setConfirmModel(true);
                              setDeleteSelectedId(item?.id);
                            }}
                            className="text-red"
                          />
                        </div>
                        <p className="font-medium  text-sm text-gray">
                          {dayjs?.utc(item?.createdAt).format("MMM DD")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ErrorPage
        data={noteByCourseData?.data}
        isFetching={notesLoading}
        error={notesError}
      />
      {confirmModel && (
        <ConfirmModel
          title={"Delete Note"}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={"Are you sure you want to delete this note?"}
          btnName={"Delete"}
          handleConfirm={() => handleDelete()}
        />
      )}
    </div>
  );
}
