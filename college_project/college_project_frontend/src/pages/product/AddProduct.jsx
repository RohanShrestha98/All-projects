import { useForm } from "react-hook-form";
import InputField from "../../components/UI/InputField";
import { useNavigate } from "react-router-dom";
import { useAuthRegisterMutation } from "../../hooks/useMutateData";
import Button from "../../components/UI/Button";

export default function AddProduct() {
  const authRegisterMutation = useAuthRegisterMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    try {
      const result = await authRegisterMutation.mutateAsync(["post", "", data]);
      if (result?.success) {
        console.log("Register success");
        navigate("/staff");
      } else {
        console.log("error", result?.response?.data?.errors?.error.toString());
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.errors?.error
        ? error?.response?.data?.errors?.error?.toString()
        : error?.message?.toString();
      console.log("error", errorMessage);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>Add Product</h1>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            register={register}
            registerName="username"
            type="text"
            placeholder="Your username"
          />
          <InputField
            register={register}
            registerName="email"
            type="email"
            placeholder="Your email"
          />
          <InputField
            register={register}
            registerName="password"
            type="password"
            placeholder="Your password"
          />
          <InputField
            register={register}
            registerName="role"
            type="number"
            placeholder="Your role"
          />
        </div>
        <Button buttonName={"Register"} />
        {/* <L to="/login">login</L
        ink> */}
      </form>
    </div>
  );
}
