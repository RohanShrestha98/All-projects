import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import emptyImg from "../../../assets/images/empty.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNoteByContentData } from "../../../hooks/useQueryData";
import { useMutate } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import { useLocation } from "react-router-dom";
import ErrorPage from "../../../components/errorPage/errorPage";
import noNote from "../../../assets/images/noNote.png";

const AddNotes = ({ setEdit, edit, setOpenForm, openForm }) => {
  const [value, setValue] = useState("");
  const [selectedNote, setSelectedNote] = useState();
  const contentDetails = JSON.parse(localStorage?.getItem("lessonDetails"));

  const contentId = contentDetails?.contentId;
  const { data, isLoading, isError, refetch } = useNoteByContentData({
    contentId,
  });

  const useNoteMutation = () =>
    useMutate(["notes"], `api/v1/notes/create/${contentId}`);
  const useNoteUpdateMutation = () =>
    useMutate(["notes"], `api/v1/notes/update/${selectedNote?.id}`);
  const useNoteDeleteMutation = () =>
    useMutate(["notes"], `api/v1/notes/delete/${selectedNote?.id}`);
  const { mutateAsync } = useNoteMutation();
  const { mutateAsync: mutateNoteAsync } = useNoteUpdateMutation();
  const { mutateAsync: mutateDeleteNoteAsync } = useNoteDeleteMutation();
  const location = useLocation();

  const isNotes = true;

  const handleSetValue = value => {
    if (value === "<p><br></p>") {
      setValue("");
    } else {
      setValue(value);
    }
  };
  const handleCreate = async () => {
    try {
      const postData = {
        courseId: location?.courseId,
        note: value,
      };
      const response = await mutateAsync(["post", "", postData]);
      if (response.success) {
        setOpenForm(false);
        toast.success("Note added successfully")
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };
  const handleUpdate = async () => {
    try {
      const postData = {
        courseId: location?.courseId,
        note: value,
      };
      const response = await mutateNoteAsync(["patch", "", postData]);
      if (response.success) {
        setOpenForm(false);
        toast.success("Note updated successfully")
        refetch();

      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await mutateDeleteNoteAsync(["delete", ""]);
      if (response.success) {
        setOpenForm(false);
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str?.toString();
    return str?.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      {!openForm ? (
        <div>
          {!isNotes ? (
            <div>
              <div className="flex justify-center">
                <img
                  src={emptyImg}
                  alt="img"
                  className="mb-4 mt-[75px] w-[200px] h-[200px]"
                />
              </div>
              <div className="text-gray-dark text-center font-normal text-[15px]">
                No previous notes added.
              </div>
            </div>
          ) : (
            <div className="mt-7">
              {data?.data?.map((item, id) => {
                const note = removeTags(item?.note);
                return (
                  <div
                    key={id}
                    className="mb-4 shadow-sm py-2 px-4 min-h-[64px] bg-white rounded"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-normal text-[15px] mt-2 flex items-center w-[80%]">
                        {note}
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="cursor-pointer text-blue"
                          onClick={() => {
                            setOpenForm(true);
                            setEdit(true);
                            setSelectedNote({ id: item?.id, note: item?.note });
                          }}
                        >
                          <AiFillEdit size={16} />
                        </div>
                        <div
                          className="cursor-pointer text-red"
                          onClick={() => {
                            setSelectedNote({ id: item?.id, note: note });
                            handleDelete();
                          }}
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    </div>
                    <div className="font-normal text-[12px] text-gray-dark flex items-end justify-end">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <ErrorPage
            emptyImage={noNote}
            title={"No Notes yet"}
            isFetching={isLoading}
            isError={isError}
            data={data?.data}
          />
          <div className="flex justify-end mt-20">
            <div
              className="flex justify-center items-center w-10 min-w-[40px] min-h-[40px] h-10 rounded-full  bg-cyan cursor-pointer"
              onClick={() => {
                setSelectedNote("");
                setOpenForm(true);
              }}
            >
              <AiOutlinePlus className="fill-white w-6 h-6" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <ReactQuill
            theme="snow"
            className="bg-white focus:ring-1 focus:ring-blue"
            defaultValue={selectedNote?.note}
            onChange={e => handleSetValue(e)}
          />
          <div className="flex items-center gap-2 justify-between">
            <div
              onClick={() => setOpenForm(false)}
              className="mt-4 flex items-center w-1/2 justify-center rounded-[100px] py-2 font-medium text-[15px] cursor-pointer bg-cyan-lighter text-cyan"
            >
              Cancel
            </div>
            <div
              className={`mt-5 flex items-center justify-center w-1/2 rounded-[100px] py-2 cursor-pointer font-medium text-[15px] text-white ${
                value === "" ? "bg-gray-6" : "bg-cyan"
              }`}
              onClick={() => (edit ? handleUpdate() : handleCreate())}
            >
              {edit ? "Update" : "Add"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNotes;
