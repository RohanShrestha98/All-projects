import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    const querySnapshot = await getDocs(collection(db, "auth"));
    const data1 = querySnapshot.docs.map((doc) => doc.data());
    data1?.map((login) => {
      if (
        login?.data?.email === formData?.email &&
        login?.data?.password === formData?.password
      ) {
        alert("Login Success");
        localStorage.setItem("email", login?.data?.email);
        localStorage.setItem("name", login?.data?.name);
        navigate("/");
      } else {
        reset();
      }
    });
  };

  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    background: background ? background : "#000000",
    color: color ? color : "#ffffff",
  };

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col gap-2"
        action=""
        onSubmit={handleSubmit(handleLogin)}
      >
        <input
          className="w-2/5 border border-blue-500"
          type="email"
          {...register("email")}
        />
        <input
          className="w-2/5 border border-blue-500"
          type="password"
          {...register("password")}
        />
        <button style={style} className="w-2/5">
          Login
        </button>
      </form>
    </div>
  );
}
