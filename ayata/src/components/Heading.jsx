/* eslint-disable react/prop-types */

export default function Heading({ title }) {
  return (
    <h1 className="font-medium text-5xl md:text-3xl sm:text-2xl text-[#293056]">
      {title}
    </h1>
  );
}
