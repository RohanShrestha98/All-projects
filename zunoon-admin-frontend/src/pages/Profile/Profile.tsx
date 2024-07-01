import React from "react";
/* import StaffForm from "../Staff/components/staffForm/StaffForm"; */
import "./Profile.scss";
// import { getUser } from "../../utils/storage";
import { useUserContext } from "../../context/UserContextProvider";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/routes";
import { useTranslation } from "react-i18next";
/* import http from "../../utils/http";
import toast from "../../utils/toast"; */

export default function Profile() {
  // const userDetail: { [key: string | number]: any } | null = getUser();
  const { user: userDetail } = useUserContext();

  const navigate = useNavigate();

  const {t} = useTranslation();

  const fullName = userDetail?.firstName || userDetail?.lastName || "";

  /* const handleClickUpdate =
    (): Function =>
    (): Function =>
    (data): void => {
      if (!data?.image?.length) {
        delete data.image;
      } else {
        if (typeof data.image === "string") {
          delete data.image;
        } else {
          data.image = data.image[0];
        }
      }

      async function pushUpdate() {
        try {
          const response = await http.PUT_FILE(
            `accounts/user/update/${data.id}/`,
            data
          );
          if (response.status === 200) {
            toast.success("Staff updated successfully");
          } else {
            toast.error(new Error("Error in updating staff"));
          }
        } catch (error) {
          toast.error(error);
        }
      }
      pushUpdate();
    }; */

  return (
    <div
      className="mh-100 row  g-0"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        // border: "1px solid red"
      }}
    >
      <div
        className="col-sm-3 mh-100  text-center"
        style={{
          borderTopLeftRadius: ".7rem",
          borderBottomLeftRadius: ".7rem",
          background: "#c9f8ff",
        }}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="Avatar"
          className="my-5"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        />
        <h5 style={{ color: "black", textTransform: "capitalize" }}>
          {fullName || userDetail?.username}
        </h5>
        <div
          style={{
            width: "75%",
            margin: "0 auto",
            borderTop: "1px solid #fff",
            borderBottom: "1px solid #fff",
          }}
        ></div>
        <Button
          buttonName={t("edit")}
          type="button"
          clickHandler={() => {
            navigate(PATH.SETTING);
          }}
        />

        {/* <i style={{ color: "black", marginTop: "1rem" }} className="far fa-edit"></i> */}
      </div>
      <div className="col">
        <div className="p-5">
          <h6>{t("information")}</h6>
          <hr className="mt-0 mb-4" />
          <div className="row pt-1">
            <div className="col mb-5">
              <h6>{t("email")}</h6>
              <p className="text-muted">{userDetail?.email}</p>
            </div>
            <div className="col mb-5">
              <h6>{t("phoneNumber")}</h6>
              <p className="text-muted">{userDetail?.phoneNumber}</p>
            </div>
          </div>

          <h6>{t("access_and_permission")}</h6>
          <hr className="mt-0 mb-4" />
          <div className="row pt-1">
            <div className="col mb-3">
              <h6>Zunun {t("staff")}</h6>
              <p className="text-muted">Can perform action specified in role</p>
            </div>
            <div className="col mb-3">
              <h6>{t("joined")}</h6>
              <p className="text-muted">December 7th, 2022</p>
            </div>
          </div>

          <div className="d-flex justify-content-start">
            <a href="#!">{/* <MDBIcon fab icon="facebook me-3" size="lg" /> */}</a>
            <a href="#!">{/* <MDBIcon fab icon="twitter me-3" size="lg" /> */}</a>
            <a href="#!">{/* <MDBIcon fab icon="instagram me-3" size="lg" /> */}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
