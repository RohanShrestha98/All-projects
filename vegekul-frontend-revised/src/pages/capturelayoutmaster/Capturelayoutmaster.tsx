import { TFunction } from "i18next";
import "../../App.scss";
import Navbar from "../../components/navbar/Navbar";
import CaptureLayoutMasterTable from "../../components/table/Capturelayoutmaster";
import { withTranslation } from "react-i18next";

function CaptureLayoutMaster({ t }: { t: TFunction }) {
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t("captureLayoutMaster")} />
      <div className="dashboard_content_area">
        <div className="flex -flex-row justify-between items-center mt-5">
          <p className="mr-20 mb-2">{t("captureLayoutMasterHeader")}</p>
          <div className="flex -flex-row justify-between items-center">
            <button className="button">{t("registration")}</button>
          </div>
        </div>
        <p>{t("importFileLayoutTemplateList")}</p>
        <CaptureLayoutMasterTable />
      </div>
    </div>
  );
}

export default withTranslation()(CaptureLayoutMaster);
