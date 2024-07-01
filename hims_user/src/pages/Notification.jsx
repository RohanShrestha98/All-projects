import Header from "../components/Header";
import NoDataPage from "../components/UI/NoDataPage";
import { useNotificationData } from "../hooks/useQueryData";
import loading from "../assets/loading.webp";

export default function Notification() {
  const { data, isLoading } = useNotificationData();
  return (
    <div>
      <Header title={"Notification"} />
      {isLoading ? (
        <div className="h-[80vh] flex  items-center justify-center">
          <img className="w-20 h-20" src={loading} alt="" />
        </div>
      ) : data?.results?.length ? (
        data?.results?.map((item) => {
          return (
            <div key={item?.id}>
              <h1>{item?.title}</h1>
              <p>{item?.description}</p>
            </div>
          );
        })
      ) : (
        <NoDataPage />
      )}
    </div>
  );
}
