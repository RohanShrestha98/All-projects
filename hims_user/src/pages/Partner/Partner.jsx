import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import PartnerTable from "./PartnerTable";

export default function Partner() {
  const navigate = useNavigate();
  return (
    <div>
      <Header title={"Partner"} />
      <div className="space-y-6 px-4 py-4 pb-10 bg-white rounded-lg">
        <section className="flex items-center justify-between">
          <h1 className="font-semibold">Partner Data Lists</h1>
          <div className="flex gap-2">
            <Button
              handleButtonClick={() => navigate("add")}
              buttonName={"Add Data"}
              className="flex items-center gap-2 py-1 pl-4 pr-6 hover:opacity-80"
            />
          </div>
        </section>
        <PartnerTable />
      </div>
    </div>
  );
}
