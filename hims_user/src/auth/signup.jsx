import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthRegisterMutation } from "../hooks/useMutateData";
import InputField from "../components/InputField";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";
import loading from "../assets/loading.webp";

const SignUp = () => {
  const authMutation = useAuthRegisterMutation();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      if (result?.status === 201) {
        toast.success("User register successfully");
        reset();
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        console.log("error");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error?.response?.data?.non_field_errors);
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen sm:w-full ">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 w-[460px] sm:w-full  sm:px-6 py-10 sm:py-6 px-14  "
      >
        <h1 className=" font-bold text-2xl pt-4 text-gray-600">SignUp</h1>
        <p className="text-gray-500 text-xs mb-2">
          Enter your credentials to login to your account.
        </p>
        <div className="w-full flex flex-col gap-[2px]  sm:h-full no-scrollbar overflow-auto">
          <InputField
            className={"mt-1"}
            register={register}
            icon={<FaRegUser />}
            required={true}
            registerName="first_name"
            // isIcon={true}
            type="text"
            label={"First Name"}
            placeholder="First Name"
          />
          {error?.first_name && (
            <p className="text-red-600 text-xs">{error?.first_name?.[0]}</p>
          )}

          <InputField
            register={register}
            // isIcon={true}
            icon={<FaRegUser />}
            registerName="last_name"
            type="text"
            required={true}
            label={"Last Name"}
            placeholder="Last Name"
          />
          {error?.last_name && (
            <p className="text-red-600 text-xs">{error?.last_name?.[0]}</p>
          )}

          <InputField
            className={"mt-1"}
            // isIcon={true}
            register={register}
            registerName="email"
            type="email"
            required={true}
            label={"Email"}
            icon={<MdOutlineEmail />}
            placeholder="Email"
          />
          {error?.email && (
            <p className="text-red-600 text-xs">{error?.email?.[0]}</p>
          )}
          <InputField
            register={register}
            // isIcon={true}
            icon={<FiPhone />}
            required={true}
            registerName="phone_number"
            type="number"
            label={"Phone Number"}
            iconName="phone"
            placeholder="Contact Number"
          />
          {error?.phone_number && (
            <p className="text-red-600 text-xs">{error?.phone_number?.[0]}</p>
          )}
          <InputField
            className={"mt-1"}
            // isIcon={true}
            register={register}
            required={true}
            icon={<MdOutlineLock />}
            registerName="password"
            type="password"
            label={"Password"}
            placeholder="Password"
          />
          {error?.password && (
            <p className="text-red-600 text-xs">{error?.password?.[0]}</p>
          )}
          <InputField
            className={"mt-1"}
            // isIcon={true}
            register={register}
            required={true}
            icon={<MdOutlineLock />}
            registerName="confirm_password"
            type="password"
            label={"Confirm password"}
            placeholder="Confirm Password"
          />
          {(error?.confirm_password || error?.non_field_errors) && (
            <p className="text-red-600 text-xs">
              {error?.confirm_password?.[0] || error?.non_field_errors?.[0]}
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          className={
            "rounded-lg mt-2 hover:opacity-70 flex gap-2 justify-center items-center border w-full h-10  bg-[#265CC0] text-white"
          }
        >
          {isLoading && <img className="w-6 h-6" src={loading} />}
          <p> Sign up</p>
        </button>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-semibold text-gray-500 text-xs">
            Already have an account?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="text-[#265CC0] underline cursor-pointer"
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
