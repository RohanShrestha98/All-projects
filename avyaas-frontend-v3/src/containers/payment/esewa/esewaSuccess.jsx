import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVerifyPayment } from "../../../hooks/useMutateData";
import Cookies from "universal-cookie";
import { useModuleStore } from "../../../store/useModuleStore";
import { decryptedData } from "../../../utils/crypto";

export const EsewaSuccess = () => {
  const location = useLocation();
  const cookies = new Cookies();
  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");
  const data = JSON.parse(atob(encodedData));
  const { currentModule } = useModuleStore();

  const selectedPackage = decryptedData(cookies.get("selectedPackage"));

  const esewaVerifyPaymentMutation = useVerifyPayment();

  const verifyEsewaPayment = () => {
    const postData = {
      amount: Number(data?.total_amount),
      courseID: currentModule?.id,
      packageID: selectedPackage?.id,
      paymentMethod: "esewa",
      transactionID: data?.transaction_code,
      transactionUuid: data?.transaction_uuid,
    };
    esewaVerifyPaymentMutation.mutateAsync(["post", "", postData], {
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  useEffect(() => {
    if (data) {
      verifyEsewaPayment();
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      {esewaVerifyPaymentMutation.isPending ? (
        <div>Loading...</div>
      ) : esewaVerifyPaymentMutation.isSuccess ? (
        <div>Payment Successful</div>
      ) : esewaVerifyPaymentMutation.isError ? (
        <div>Payment Failed</div>
      ) : null}
    </div>
  );
};
