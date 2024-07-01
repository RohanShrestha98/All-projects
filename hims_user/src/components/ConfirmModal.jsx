/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "./Button";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(128, 128, 128, 0.5)", // Adjust the alpha value for transparency
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

export default function ConfirmModal({
  isOpen,
  messeges,
  setIsOpen,
  handleChange,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-[300px] rounded-xl">
          <p className="mb-4 font-semibold text-gray-700">{messeges}</p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              handleButtonClick={() => setIsOpen(false)}
              className={"bg-red-500 hover:opacity-80 rounded-lg"}
              buttonName={"Cancel"}
            />
            <Button
              buttonName={"Confirm"}
              className={" hover:opacity-80 rounded-lg"}
              handleButtonClick={() => {
                handleChange();
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
