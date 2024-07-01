import Header from "../components/Header";
import book from "../assets/books.svg";
import { useNavigate } from "react-router-dom";
import { useLibaryData } from "../hooks/useQueryData";
import { LuDownload } from "react-icons/lu";
import NoDataPage from "../components/UI/NoDataPage";
import loading from "../assets/loading.webp";

export default function Library() {
  const navigate = useNavigate();
  const { data, isLoading } = useLibaryData();
  return (
    <div>
      <Header title={"Library"} />
      <div className="w-full bg-white rounded-md px-4 sm:px-0 py-6">
        {isLoading ? (
          <div className="h-[80vh] flex  items-center justify-center">
            <img className="w-20 h-20" src={loading} alt="" />
          </div>
        ) : data?.results?.length ? (
          <div className=" sm:py-2 sm:px-0">
            <div className="flex items-center justify-between">
              <p className="text-[#265CC0] font-semibold text-xl sm:text-lg">
                Books
              </p>
              <input
                className="border rounded-full bg-gray-50 w-60 sm:w-40 sm:h-8 px-4 outline-none h-10"
                placeholder="Search.."
              ></input>
            </div>
            <div className="grid grid-cols-4  gap-4 mt-4 md:gap-2 lg:grid-cols-3 md:grid-cols-2 ">
              {data?.results?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    onClick={() =>
                      navigate("./book", { state: { id: item?.idx } })
                    }
                    className="p-3 sm:p-2  rounded-md bg-white cursor-pointer shadow-md sm:shadow border-gray-200 hover:shadow-lg sm:hover:shadow-md "
                  >
                    <img
                      src={item?.image ?? book}
                      className="w-full object-cover h-[180px] sm:h-[120px] rounded-md"
                      alt=""
                    />
                    <h1 className="text-base text-gray-950  font-semibold mt-1 line-clamp-1">
                      {item?.title}
                    </h1>
                    <div className="flex items-center justify-between ">
                      <p className="text-gray-400 font-normal text-sm line-clamp-1">
                        {item?.author}
                      </p>
                      <a
                        href={item?.pdf_file}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        rel="noreferrer"
                      >
                        <LuDownload
                          className="text-[#265cc0] min-w-[20px] "
                          size={20}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <NoDataPage />
        )}
      </div>
    </div>
  );
}
