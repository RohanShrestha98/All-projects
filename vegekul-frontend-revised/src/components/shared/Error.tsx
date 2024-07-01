import ErrorSvg from "../../assets/error.svg";

const Error = () => (
  <div className="mx-auto my-12 flex flex-col items-center gap-4">
    <img src={ErrorSvg} alt="Error" className="h-80" />
    <span className="font-medium">
      Oops! Something went wrong. Please refresh or try again later!
    </span>
  </div>
);

export default Error;
