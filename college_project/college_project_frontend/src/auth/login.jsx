import { useForm } from "react-hook-form";
import { useNavigate } from "`react-router-dom`";
import { useAuthMutation } from "../hooks/useMutateData";
import { useAuthContext } from "../context/authContext";
import Cookies from "universal-cookie";
import { encryptData } from "../utils/crypto";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";

const Login = () => {
  const { setAuth } = useAuthContext();
  const authMutation = useAuthMutation();
  const navigate = useNavigate();
  const cookies = new Cookies({ path: "/" });

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      if (result?.success) {
        console.log("Login success");
        const userDetailsData = {
          accessToken: result?.accessToken,
          user: {
            id: result?.data?.id,
            email: result?.data?.email,
            username: result?.data?.username || "",
          },
        };
        console.log("userDetailsData", userDetailsData);
        setAuth(userDetailsData);
        cookies.set("accessToken", encryptData(result?.accessToken));
        cookies.set("userDetails", encryptData(userDetailsData));
        reset();
        navigate("/");
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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 w-96 border shadow-md px-4 py-4 pb-10 items-center rounded-md"
      >
        <h1 className="font-bold text-2xl">Login Form</h1>
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
        <Button buttonName={"Login"} />
        {/* <Link to="/register">Register</Link> */}
      </form>
    </div>
  );
};

export default Login;
