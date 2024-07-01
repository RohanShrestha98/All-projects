import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Tables from "../Tables/Tables";
import httpMethods from "../../utils/http";
import config from "../../config";
import toast from "../../utils/toast";
import Loader from "../../components/Loader/Loader";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal/DeleteModal";

const basketApi = config.endpoints.api.basket;

interface IData {
  basketId: string;
  contentId: string[];
}

const CustomModal = ({
  showContentModal,
  setShowContentModal,
  title,
  eachBasketContentList,
  t,
  error,
  loading,
}) => {
  const [checkedContentsFromBasket, setCheckedContentsFromBasket] = useState<any>();

  const [selectedContentFromBasket, setSelectedContentFromBasket] = useState<any>();

  const contentData = eachBasketContentList?.data?.contents?.length
    ? eachBasketContentList?.data?.contents
    : [];
  const basketId = eachBasketContentList?.data?.id;
  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleSelectedRows = (selectedRows: string[]) => {
    if (checkedContentsFromBasket?.toString() !== selectedRows?.toString())
      setCheckedContentsFromBasket(selectedRows);
  };

  const columns = [
    {
      Header: `${t("th_name")}`,
      accessor: "name" || "-",
    },
    {
      Header: `${t("th_content_type")}`,
      accessor: "type" || "-",
    },
    {
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;

        return (
          <td className="actions">
            <FontAwesomeIcon
              onClick={() => {
                setShowDeleteModal(true);
                setSelectedContentFromBasket(original);
              }}
              className="trash_btn"
              style={{
                marginTop: "0.2rem",
              }}
              icon={faTrashCan}
            />
          </td>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  const handleDelete = async () => {
    const data = {
      basketID: basketId,
      contentID: [selectedContentFromBasket?.id],
    };
    try {
      const response = await httpMethods.DELETE(basketApi.removeContentFromBasket, data);
      if (response.status === 200) {
        toast.success("Content deleted from basket successfully");
        setShowContentModal(false);
      } else {
        toast.error(new Error("Error in deleting the content from the basket"));
      }
    } catch (error) {
      toast.error(error?.toString());
    }
  };
  const handleBulkDelete = async () => {
    const data = {
      basketID: basketId,
      contentID: checkedContentsFromBasket,
    };
    try {
      const response = await httpMethods.DELETE(basketApi.removeContentFromBasket, data);
      if (response.status === 200) {
        toast.success("Contents deleted from basket successfully");
        setShowContentModal(false);
      } else {
        toast.error(new Error("Error in deleting the contents from the basket"));
      }
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  return (
    <>
      <Modal
        show={showContentModal}
        onHide={() => setShowContentModal(false)}
        style={{ marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-grid gap-2" style={{ width: "430px" }}>
            <span>{title || "Basket"}</span>
            {checkedContentsFromBasket?.length ? (
              <div
                style={{
                  backgroundColor: "rgb(182, 245, 255)",
                  justifyContent: "space-between",
                  display: "flex",
                  padding: "0.2em 0.5em",
                  borderRadius: "4px",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <span className="fs-6">{checkedContentsFromBasket?.length} Contents Selected</span>
                <div>
                  <Button
                    type="button"
                    clickHandler={handleBulkDelete}
                    buttonName={`${t("remove")}`}
                    color="danger"
                  />
                </div>
              </div>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Tables
            data={contentData}
            ID={basketId}
            hasError={error}
            columns={columns}
            isFetching={loading}
            hasCheckBox={true}
            onSelectRows={handleSelectedRows}
            disableDelete={false}
            handleDelete={handleDelete}
            selectedElementRef={selectedElementRef}
            contentBasketAction={true}
            hasActions={false}
          />
        </Modal.Body>
      </Modal>
      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        name={selectedContentFromBasket?.name}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default withTranslation()(CustomModal);
