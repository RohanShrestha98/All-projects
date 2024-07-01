import React, { useState } from "react";
import { message } from "antd";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSvg from "../../assets/allSvg";
import { useNavigate } from "react-router-dom";

const AccountDeletionForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [email, setEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (event) => {
    setIsDeleting(true);
    event.preventDefault();
    message.success("Your account has been deleted successfully");
    setTimeout(() => {
      logout();
      navigate("/login");
      setIsDeleting(false);
    }, 4000);
  };

  return (
    <>
      {isDeleting ? (
        <LoadingSvg />
      ) : (
        <div className="flex flex-col gap-3 p-20 ">
          <h2 className="text-2xl font-bold">Request for Account Deletion</h2>
          <p>
            Send a request to delete your account and personally identifiable
            information (Ebidhya) that is stored on our system. You will receive
            an email to verify your request. Once the request is verified we
            will take care of deleting your Ebidhya. If you just want to check
            what Ebidhya we have stored, you can{" "}
            <u className="text-theme-color cursor-pointer">request your data</u>
            .
          </p>
          <h5 className="text-base font-bold">
            Note: Your request for account deletion will be fulfilled within 3
            days.
          </h5>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-xs text-gray">
              <h5 className="text-base font-bold">
                Email or Username<span className="text-red">*</span>
              </h5>
              <input
                className="h-10 border-none bg-white-gray pl-4 rounded-lg text-black text-base"
                type="text"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div className="flex justify-end gap-4">
              <button
                className="bg-theme-color border border-theme-color hover:text-theme-color hover:bg-white px-4 py-1 rounded cursor-pointer text-white"
                type="cancel"
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button
                className="bg-red border border-red hover:text-red hover:bg-white px-4 py-1 rounded cursor-pointer text-white"
                type="submit">
                Yes, Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AccountDeletionForm;
