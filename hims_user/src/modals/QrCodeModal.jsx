/* eslint-disable react/prop-types */
import Modal from "react-modal";
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

export default function QRCodeModal({ isOpen, setIsOpen, qrCode }) {
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
      >
        <div>
          <p className="text-center font-semibold text-xl">Scan me</p>
          <img
            className="w-[200px] h-[200px] object-cover"
            src={qrCode}
            alt=""
          />
        </div>
      </Modal>
    </div>
  );
}
