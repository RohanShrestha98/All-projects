import React, { useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Card, CardProps } from '../../components/Card';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
// import { Cross2Icon } from "@radix-ui/react-icons";
// import "./styles.css";

interface Props {
  triggerClassName?: string;
  children: React.ReactNode;
  cardData: CardProps[];
  setMode?: any;
  renderCard?: (d: any) => void;
  moveCard?: (d: any) => void;
  handlePickingListSubmit: (mode: string, orderIds: string[]) => void;
  t: TFunction;
}

const PickingListModel = ({
  triggerClassName = '',
  children,
  cardData,
  moveCard,
  setMode,
  renderCard,
  handlePickingListSubmit,
  t,
}: Props) => {
  const renderCards = useCallback(() => {
    return (
      cardData &&
      cardData.map((card: CardProps, index: number) => {
        return (
          <Card
            key={card.idx}
            index={index}
            id={card.idx}
            moveCard={moveCard}
            amount={card.amount}
            customer_code={card.customer_code}
            customer_name={card.customer_name}
            delivery_date={card.delivery_date}
            item_quantity={card.item_quantity}
            order_number={card.order_number}
            product_code={card.product_code}
            product_name={card.product_name}
            unit_of_measure={card.unit_of_measure}
            unit_price={card.unit_price}
          />
        );
      })
    );
  }, [cardData, renderCard]);

  const handleSubmit = mode => {
    handlePickingListSubmit(
      mode,
      cardData?.map((item: any) => item.idx)
    );
    setMode(mode);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={triggerClassName}>{children}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content2">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {t('pickingList')}
          </Dialog.Title>
          <div className="overflow-auto">
            {cardData?.length ? (
              renderCards()
            ) : (
              <p className="mb-4">{t('emptyPickingList')}</p>
            )}
          </div>
          <div className="flex flex-row items-center mt-6 justify-between">
            <Dialog.Close asChild>
              <button
                className=" bg-danger border-2 border-danger text-white hover:text-danger hover:bg-white  px-10 py-1"
                aria-label="Close"
              >
                {t('close')}
              </button>
            </Dialog.Close>
            {cardData?.length !== 0 ? (
              <div className="flex flex-row gap-3">
                <button
                  className=" bg-buttonColor border border-buttonColor text-white hover:text-buttonColor hover:bg-white  px-6 h-9"
                  value="pdf"
                  onClick={() => handleSubmit('pdf')}
                >
                  {t('downloadPDF')}
                </button>
                <button
                  value="fax"
                  className={`border bg-buttonColor  border-buttonColor text-white hover:text-buttonColor hover:bg-white  px-6 h-9`}
                  onClick={() => handleSubmit('fax')}
                >
                  {t('sendFax')}
                </button>
                <button
                  value="pdf_fax"
                  className=" bg-buttonColor border border-buttonColor text-white hover:text-buttonColor hover:bg-white  px-6 h-9"
                  onClick={() => handleSubmit('pdf_fax')}
                >
                  {t('downloadPDFAndSendFax')}
                </button>
              </div>
            ) : (
              <button
                value="pdf_fax"
                className=" bg-inputColor border-2 border-inputColor text-white  px-10 py-1"
                disabled
              >
                {t('notAvailable')}
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default withTranslation()(PickingListModel);
