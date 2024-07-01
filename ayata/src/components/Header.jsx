/* eslint-disable react/prop-types */

export default function Header({ title, description, className }) {
  return (
    <div className="flex flex-col w-full gap-4 md:gap-2 justify-center items-center  ">
      <h1
        className={`font-medium text-center text-5xl md:text-3xl sm:text-xl text-[#293056] ${className}`}
      >
        {title}
      </h1>
      <p
        className={`text-[#667085] text-center sm:text-base leading-8 font-normal w-[60%] md:w-[90%] sm:w-full  ${className}`}
      >
        {description}
      </p>
    </div>
  );
}
