import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { PATH } from "../../constants/routes";
import "./CustomTooltip.scss";

interface ITooltip {
  original?: any;
  data?: any;
  id?: string;
  isApproved?: boolean;
}

const CustomTooltip = ({ original, data, id, isApproved }: ITooltip) => {
  const location = useLocation();
  const navigate = useNavigate();
  let originalString = original && original.toString();
  const isLevelTypePath =
    location.pathname === "/level-type/ " || location.pathname.includes("/level-type");

  return (
    <>
      <span data-tooltip-id={id} data-tooltip-content={originalString}>
        <p
          onClick={() => {
            data &&
              navigate(PATH.TABLE_OF_CONTENT, {
                state: { id: id, name: original, levelData: data, isApproved: isApproved },
                replace: true,
              });
          }}
          className="tooltip_data"
          style={isLevelTypePath ? { position: "relative", top: "6px" } : {}}
        >
          {originalString ?? "-"}
        </p>
      </span>
      <Tooltip
        place="top-start"
        id={id}
        style={{
          position: "fixed",
          backgroundColor: "#00bad6",
          fontSize: "12px",
          paddingBottom: "0.3rem",
          paddingTop: "0.3rem",
          maxWidth: "30%",
          zIndex: "80",
        }}
      />
    </>
  );
};

export default CustomTooltip;
