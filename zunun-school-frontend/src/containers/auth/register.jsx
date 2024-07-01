// eslint-disable-next-line
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import InputFileld from "../../components/inputFiled/inputField";

const Register = () => {
  const registerSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string().required("Required").max(100, "Too Long!"),

    confirmPassword: Yup.string()
      .required("Required")
      .max(100, "Too Long!")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmitHandler = async () => {
    reset();
  };

  return (
    <div className="sm:bg-white w-full h-full flex flex-col sm:gap-16  sm:px-6 sm:py-16">
      <div className="hidden sm:block px-4  ">
        <ImArrowLeft2 />
      </div>
      <div className="md:bg-white w-1/2 xl:w-2/3 lg:w-3/4 md:w-full h-full flex ml-12 md:ml-0 flex-col md:gap-16 md:h-[100vh]  md:px-6 md:py-16">
        <div className="flex-col bg-white w-full  sm:w-full px-6 py-8 sm:py-0 rounded-lg sm:border-none space-y-6 sm:space-y-16">
          <div className="text-2xl sm:text-5xl font-bold">
            Create your <span className="block sm:mt-1">Account</span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col w-full space-y-4 sm:space-y-4 "
          >
            <div className="rounded-md">
              <InputFileld
                {...register("email")}
                name="email"
                type="email"
                placeholder="Email"
                prefixIcon={<MailOutlined />}
              />
              <p className="text-red text-sm">{errors?.identity?.message}</p>
            </div>
            <div className="rounded-md">
              <InputFileld
                {...register("password")}
                name="password"
                type="password"
                placeholder="Password"
                prefixIcon={<LockOutlined />}
              />
              <p className="text-red text-sm">{errors?.password?.message}</p>
            </div>
            <div className="rounded-md">
              <InputFileld
                {...register("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                prefixIcon={<LockOutlined />}
              />
              <p className="text-red text-sm">
                {errors?.confirmPassword?.message}
              </p>
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className={`flex justify-center items-center gap-2 rounded-full ${
                isValid
                  ? "bg-blue-light text-white"
                  : "bg-gray-100 sm:bg-gray-dark text-neutral sm:text-white"
              }  sm:p-4 p-2 `}
            >
              Sign Up <ImArrowRight2 />
            </button>
          </form>
        </div>
        {/* <div>
          <Divider orientation="center" plain>
            or continue with
          </Divider>
          <div className="flex flex-row items-center justify-center gap-8">
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.facebook.com/">
                <FaFacebook className="text-blue-500" size={24} />
              </Link>
            </div>
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.google.com/">
                <FcGoogle size={24} />
              </Link>
            </div>
          </div>
        </div> */}
        <div className="my-4 text-center">
          <span className="text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
