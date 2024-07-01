import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../../config";
import useFetch from "../../../../hooks/useFetch";
import http from "../../../../utils/http";
import toast from "../../../../utils/toast";
import { PATH } from "../../../../constants/routes";
import Button from "../../../../components/Button/Button";
import { withTranslation } from "react-i18next";
import "./Content-Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../../../components/Modal/Modal";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";
import httpMethods from "../../../../utils/http";
import BasketEditForm from "./BasketEditForm";
import { ILesson } from "../../../../@types/lesson";
import AssignLessonForm from "./AssignLessonForm";
import ErrorPages from "../../../../components/ErrorPages/ErrorPages";

const basketApi = config.endpoints.api.basket;

function ContentBasket({ t }) {
  const [basketList, setBasketList] = useState([]);
  const [eachBasketContentList, setEachBasketContentList] = useState({});

  const navigate = useNavigate();
  const [overlayOpen, setOverlayOpen] = useState(false);

  const [showContentModal, setShowContentModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [basketName, setBasketName] = useState<string>("");
  const [basketData, setBasketData] = useState({});
  const [basketId, setBasketId] = useState<number | null>(null);

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(basketApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setBasketList(fetchedData.data);
    } else {
      setBasketList(null);
    }
  }, [fetchedData]);

  const getEachBasketContentData = async (basketId: string) => {
    try {
      const response = await httpMethods.GET(basketApi.details(basketId), "");
      if (response.status === 200) {
        setEachBasketContentList(response.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleBasketDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(basketApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("basket")} ${t("deleted_successfully")}`);

        setTimeout(() => {
          setBasketList(baskets => {
            return baskets?.filter(basket => (basket?.id !== id ? basket : null));
          });
          fetchNewData(basketApi.list);
        }, 200);
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("basket")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const memoizedEachBasketContentList = useMemo(
    () => eachBasketContentList,
    [eachBasketContentList],
  );

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("content_basket")}</h4>
        <div className="row-container">
          <div className="button_wrapper">
            <Link to={PATH.ADD_CONTENT}>
              <Button
                type="button"
                clickHandler={() => navigate("/contents")}
                buttonName={`${t("back")}`}
                color="success"
              />
            </Link>
          </div>
        </div>
      </div>
      {basketList?.map(basket => {
        return (
          <div key={basket.id} className="table_row">
            <div
              className="basket_wrapper"
              style={{
                border: `${
                  showContentModal && basketId === basket?.id ? "1px solid #00bad6" : ""
                } `,
              }}
              onClick={() => {
                setShowContentModal(true);
                getEachBasketContentData(basket?.id);
                setBasketName(basket?.name);
                setBasketId(basket?.id);
              }}
            >
              <div className="left-side">
                <p>{basket?.name}</p>
              </div>
              <div className="right-side">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={e => {
                    e.stopPropagation();
                    setShowEditModal(true);
                    setBasketData(basket);
                  }}
                  className="edit_btn"
                />
                <FontAwesomeIcon
                  onClick={e => {
                    e.stopPropagation();
                    setBasketId(basket?.id);
                    setShowDeleteModal(true);
                    setBasketName(basket.name);
                  }}
                  icon={faTrash}
                  className="trash_btn"
                />
              </div>
            </div>
            <div>
              <Button
                type="button"
                clickHandler={() => {
                  setOverlayOpen(true);
                  setBasketId(basket?.id);
                }}
                buttonName={`${t("assign_to_lesson")}`}
                color="success"
              />
            </div>
          </div>
        );
      })}

      <ErrorPages isFetching={loading} data={basketList} error={error} />

      <CustomModal
        eachBasketContentList={memoizedEachBasketContentList}
        error={error}
        loading={loading}
        title={basketName}
        showContentModal={showContentModal}
        setShowContentModal={setShowContentModal}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={basketId}
        name={basketName}
        handleDelete={handleBasketDelete}
      />
      <BasketEditForm
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        basketData={basketData}
      />
      {overlayOpen && (
        <div className="sidebarFilterTotal">
          <div className="sidebarFilterOverlay" onClick={() => setOverlayOpen(false)}></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>{t("assign_content_to_lesson")}</h1>
              <img
                src="/cross.png"
                style={{ width: "20px", marginRight: "20px" }}
                onClick={() => setOverlayOpen(false)}
                alt=""
              />
            </div>
            <AssignLessonForm basketId={basketId} setOverlayOpen={setOverlayOpen} />
          </div>
        </div>
      )}
    </>
  );
}
export default withTranslation()(ContentBasket);
