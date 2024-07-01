import { useForm } from "react-hook-form";
import { useNavigate } from "`react-router-dom`";
import { useAdminAuthRegisterMutation, useAuthRegisterMutation } from "../hooks/useMutateData";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";

const Register = () => {
  const authRegisterMutation = useAdminAuthRegisterMutation();
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
    <div className="flex justify-start items-start h-screen">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 w-[500px] border shadow-md px-4 py-4 pb-10  rounded-md"
      >
        <h1 className="font-semibold text-xl">Create Staff</h1>
        <div className="grid grid-cols-2 gap-2 my-6">

        
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
        <Button buttonName={"Create staff"} />
        {/* <Link to="/login">login</Link> */}
      </form>
    </div>
  );
};

export default Register;
