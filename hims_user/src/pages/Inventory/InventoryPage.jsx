import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InventoryTable from "./InventoryTable";

export default function Inventory() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  return (
    <div>
      <Header title={"Inventory"} />
      <div className="space-y-6 px-4 py-4 pb-10 bg-white rounded-lg">
        <section className="flex items-center justify-between">
          <h1 className="font-semibold">Inventory Lists</h1>
          <div className="flex gap-2">
            {/* <Search
              placeholder="Search Inventory"
              searchHandler={setDebouncedSearch}
            /> */}
            <Button
              handleButtonClick={() =>
                axiosPrivate
                  .get("hospital/hospital-export/", {
                    responseType: "blob",
                  })
                  .then((blob) => {
                    const file = window.URL.createObjectURL(blob.data);
                    window.location.assign(file);
                  })
              }
              buttonName={"Export"}
              className="flex items-center gap-2 py-0 pl-4 pr-6 max-w-[200px] hover:opacity-80"
            />
            <Button
              handleButtonClick={() => navigate("add")}
              buttonName={"Add Inventory"}
              className="flex items-center gap-2 py-1 pl-4 pr-6 hover:opacity-80"
            />
          </div>
        </section>
        <InventoryTable />
      </div>
    </div>
  );
}
