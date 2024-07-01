/* eslint-disable react/prop-types */
import moment from "moment";
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

export default function PartnerDetailModal({ isOpen, setIsOpen, data }) {
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
        <div className="space-y-2 min-w-[400px]">
          <h1 className="text-center text-lg mb-4">Details</h1>
          {Object.entries(data?.data).map(([item, value]) => (
            <div key={value} className="flex items-center gap-x-2">
              <h3 className="font-medium text-sm text-grayTextDark">
                {item.replace("_", " ").at(0).toUpperCase() +
                  item.replace("_", " ").slice(1)}
                :
              </h3>
              {value?.startsWith("http") ? (
                <a
                  className="text-xs"
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click to view
                </a>
              ) : (
                <p className="text-xs">{value !== "" ? value : "N/A"}</p>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
