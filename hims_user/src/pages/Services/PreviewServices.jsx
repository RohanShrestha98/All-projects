/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { useDepartnmentManagementHospitalDepartnment } from "../../hooks/useQueryData";

export default function PreviewServices() {
  const location = useLocation();
  const stateData = location?.state;
  const { data } = useDepartnmentManagementHospitalDepartnment({
    idx: stateData?.idx,
  });
  // eslint-disable-next-line react/prop-types
  const SubDepartnment = ({ item }) => {
    return (
      <div className="ml-4" key={item?.id}>
        <p>{item?.title}</p>
        {item?.sub_department?.map((item2) => {
          return <SubDepartnment item={item2} />;
        })}
      </div>
    );
  };
  return (
    <div>
      <Header title={"Services List"} />
      <div className="space-y-4 px-4 py-4 pb-10 bg-white rounded-lg">
        <p>{data?.title}</p>
        {data?.sub_department?.map((item) => {
          return <SubDepartnment item={item} />;
        })}
      </div>
    </div>
  );
}
