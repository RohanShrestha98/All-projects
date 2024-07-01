import { useForm } from "react-hook-form";
import { useNavigate } from "`react-router-dom`";
import { useCreateContactMutation } from "../hooks/useMutateData";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";

const CreateContact = () => {
  const createContactMutation = useCreateContactMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    try {
      const result = await createContactMutation.mutateAsync([
        "post",
        "",
        data,
      ]);
      if (result?.success) {
        console.log("Contact created successfull");
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
        <h1 className="font-bold text-2xl">Contact Form</h1>
        <InputField
          register={register}
          registerName="name"
          type="text"
          placeholder="Your name"
        />
        <InputField
          register={register}
          registerName="email"
          type="email"
          placeholder="Your email"
        />
        <InputField
          register={register}
          registerName="phone"
          type="text"
          placeholder="Your phone"
        />
        <Button buttonName={"Create Contact"} />
      </form>
    </div>
  );
};

export default CreateContact;
