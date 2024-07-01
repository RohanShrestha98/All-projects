import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useJoinProgramMutation } from "../hooks/useMutateData";
import loading from "../assets/loading.webp";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff", // Set the modal background color
  },
};

// eslint-disable-next-line react/prop-types
export default function JoinProgramModal({ isOpen, setIsOpen }) {
  const [programId, setProgramId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  function closeModal() {
    setIsOpen(false);
  }

  const joinProgramMutation = useJoinProgramMutation();
  const handleProgramJoin = async () => {
    const postData = {
      program_code: programId,
      start_date: startDate,
    };
    setIsLoading(true);
    try {
      const result = await joinProgramMutation.mutateAsync([
        "post",
        "",
        postData,
      ]);
      setIsLoading(false);
      if (result?.status === 200) {
        toast.success("Success");
        setIsOpen(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.message || error?.response?.data?.start_date?.[0]
      );
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-[300px] flex flex-col gap-2">
          <h1 className="text-center text-lg mb-2 font-semibold text-gray-600">
            Program
          </h1>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="text-sm font-semibold text-gray-600 mb-1"
            >
              Program Code
            </label>
            <input
              type="text"
              onChange={(e) => setProgramId(e.target.value)}
              placeholder="Enter program code"
              className="border h-10 px-2 rounded outline-none"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor=""
              className="text-sm font-semibold text-gray-600 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="border h-10 px-2 rounded outline-none"
            />
          </div>
          <button
            onClick={() => handleProgramJoin()}
            disabled={isLoading}
            className={`rounded-lg mt-2 hover:opacity-70 border flex gap-2 justify-center items-center w-full h-10  bg-[#265CC0] text-white`}
          >
            {isLoading && <img className="w-6 h-6" src={loading} />}
            <p> Join Program</p>
          </button>
        </div>
      </Modal>
    </div>
  );
}
