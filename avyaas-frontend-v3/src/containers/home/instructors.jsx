import React from "react";
import instructor1 from "../../assets/instructor1.svg";
import { useTeacher } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import Empty from "../../components/shared/empty";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";

const Instructors = () => {
  const { currentModule } = useModuleStore();
  const { data, isLoading, isError } = useTeacher(currentModule?.id);

  return (
    <div className="flex flex-col gap-4 md:gap-3">
      <section className="flex items-center gap-3">
        <span className="border border-l-1 h-4 text-[#595959] md:hidden" />
        <h2 className="text-base font-semibold md:text-xs font-semi-bold text-[#595959]">
          Our Instructors
        </h2>
      </section>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : data?.data?.length === 0 ? (
        <Empty message="Sorry, No Instructors found" />
      ) : (
        <div className="flex flex-nowrap w-full overflow-x-auto no-scrollbar">
          {data?.data?.map((item) => {
            return (
              <div key={item?.id}
                className="flex-shrink-0 w-36  flex flex-col justify-start gap-2 rounded-xl mr-4">
                <img
                  src={item?.image ?? instructor1 }
                  className="h-40 md:h-24 object-cover object-top rounded-xl border"
                />
                <div className="text-[#333333] text-sm md:text-[11px] tracking-tight break-words line-clamp-2">
                  <h4> {item?.firstName} {item?.middleName} {item?.lastName} </h4>
                  <p>{item?.subject?.title}</p>
                </div>
              </div>
            )
          } 
          )}
        </div>
      )}
    </div>
  );
};

export default Instructors;
