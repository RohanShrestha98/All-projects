import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVerifyPayment } from "../../../hooks/useMutateData";
import Cookies from "universal-cookie";
import { useModuleStore } from "../../../store/useModuleStore";
import { decryptedData } from "../../../utils/crypto";

export const KhaltiSuccess = () => {
  const location = useLocation();
  const cookies = new Cookies();
  const searchParams = new URLSearchParams(location.search);
  const transactionID = searchParams.get("transaction_id");
  const pidx = searchParams.get("pidx");
  const total_amount = searchParams.get("total_amount");
  const { currentModule } = useModuleStore();

  console.log(currentModule);

  const selectedPackage = decryptedData(cookies.get("selectedPackage"));

  const khaltiVerifyPaymentMutation = useVerifyPayment();

  const verifyKhaltiPayment = () => {
    const postData = {
      amount: Number(total_amount),
      courseID: currentModule?.id,
      packageID: selectedPackage?.id,
      paymentMethod: "khalti",
      transactionID: transactionID,
      transactionUuid: pidx,
    };
    khaltiVerifyPaymentMutation.mutateAsync(["post", "", postData], {
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  useEffect(() => {
    if (transactionID) {
      verifyKhaltiPayment();
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      {khaltiVerifyPaymentMutation.isPending ? (
        <div>Loading...</div>
      ) : khaltiVerifyPaymentMutation.isSuccess ? (
        <div>Payment Successful</div>
      ) : khaltiVerifyPaymentMutation.isError ? (
        <div>Payment Failed</div>
      ) : null}
    </div>
  );
};
