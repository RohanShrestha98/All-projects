import { useKhaltiPaymentMutation } from "../../../hooks/useMutateData";
import { clientURL } from "../../../config/config";

const useKhaltiPayment = ({ selectedPackage, amount, referralCode = "" }) => {
  const khaltiInitiateMutation = useKhaltiPaymentMutation();

  const uniqueId = new Date().getTime().toString(36);

  const payload = {
    returnUrl: `${clientURL}khalti_payment_success`,
    websiteUrl: `${clientURL}`,
    amount: amount * 100,
    purchaseOrderID: `${selectedPackage?.title}-${uniqueId}`,
    purchaseOrderName: `${selectedPackage?.period} Days ${selectedPackage?.title} Plan`,
  };

  const handleKhaltiPayment = () => {
    khaltiInitiateMutation.mutateAsync(["post", "", payload], {
      onSuccess: (response) => {
        window.location.href = response.data.payment_url;
      },
      onError: (error) => {
        console.log(error, "khalti error");
      },
    });
  };
  return handleKhaltiPayment;
};

export default useKhaltiPayment;
