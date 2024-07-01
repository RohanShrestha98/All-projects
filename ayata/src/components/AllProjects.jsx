/* eslint-disable react/prop-types */
import project1 from "../assets/client1.png";
import project2 from "../assets/client2.png";
import project3 from "../assets/client3.png";
import project4 from "../assets/client4.png";
import Button from "./Button";

export default function AllProjects({ title }) {
  const projects = [
    project1,
    project2,
    project3,
    project4,
    project2,
    project3,
    project4,
    project1,
  ];
  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-[#363F72] font-semibold text-center text-2xl">
        {title}
      </h1>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
        {projects?.map((img) => {
          return (
            <img
              className="object-cover h-full w-full rounded-sm"
              key={img}
              src={img}
            />
          );
        })}
      </div>
      <Button buttonName={"Expand"} width={240} />
    </div>
  );
}
