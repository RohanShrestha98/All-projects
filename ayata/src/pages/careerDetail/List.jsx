/* eslint-disable react/prop-types */

export default function List({ title, data, dots }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#363F72] font-medium leading-5">{title}</p>
      <ul className={` ps-4 ${dots ? "list-disc" : "list-decimal"}`}>
        {data?.map((items) => {
          return (
            <li key={items.id} className="text-[#667085] leading-8 ps-2">
              {items?.point}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
