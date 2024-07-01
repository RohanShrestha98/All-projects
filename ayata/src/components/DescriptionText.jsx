/* eslint-disable react/prop-types */

export default function DescriptionText({ description, className }) {
  return (
    <p className={`text-[#667085] text-base font-normal ${className}`}>
      {description}
    </p>
  );
}
