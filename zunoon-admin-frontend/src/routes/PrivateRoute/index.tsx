import { Navigate } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout";
import { PATH } from "../../constants/routes";

export default function PrivateRoute() {
  const token = localStorage?.getItem("access");
  // if (token === null || undefined || "") {
  //   return <Navigate to={PATH.LOGIN} state={{ unauthorised: true }} />;
  // } else {
  //   return <BaseLayout />;
  // }
  return token ? <BaseLayout /> : <Navigate to={PATH.LOGIN} state={{ unauthorised: true }} />;
}
