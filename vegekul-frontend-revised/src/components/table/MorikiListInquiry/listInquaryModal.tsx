/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import SubHeading from '../../Subheading';
import { withTranslation } from 'react-i18next';
import { morikiOrderTableHeaders } from '../headers/MorikiOrderHeader';
import toast from 'react-hot-toast';
import { useOrderMutation } from '../../../hooks/Usemutatedata';
import { AxiosError } from 'axios';
import ModalTable from '../../shared/ModalTable';



interface Props {
    data?: any;
    children: React.ReactNode;
    triggerClassName?: string;
    isEdit?: boolean;
    onSuccess?: () => null;
    dialogOpen?: boolean;
    setOpen?: boolean;
    open?: boolean;
    t: TFunction;
}


function ListInquaryModal({
    data,
    children,
    setOpen,
    open,
    mode,
    successHandler,
    triggerClassName = '',
    onSuccess,
    t,
}: Props) {
    const [isAddClicked, setIsAddClicked] = useState(true);
    const [selectedData, setSelectedData] = useState([]);
    const [active, setActive] = useState('update');
    const [clearSelection, setClearSelection] = useState<any>(false);
    const listInquiryUpdateMutation = useOrderMutation();
    const {
        reset,
    } = useForm<any>();
    const columns = useMemo(() => morikiOrderTableHeaders, []);

    const closeHandler = () => {
        setOpen(false);
        reset();
        setActive('update')
        onSuccess && onSuccess();
    };

    const handleBulkUpdate = () => {
        const updatedSelectedData = selectedData.map(item => ({
            ...item,
            ordering_comments: ''
        }));

        const data = updatedSelectedData;

        listInquiryUpdateMutation
            .mutateAsync(['PATCH', 'bulk-update/', data])
            .then(response => {
                toast.success(t('inquiryListUpdatedSuccessfully'));
                setClearSelection(true);
                successHandler()
                closeHandler()
            })
            .catch((err: AxiosError) => {
                toast.error(t('errorUpdatingData'));
            });
    };


    const handleRowAdd = () => {
        if (!selectedData?.[0]?.batch_summary_code) {
            toast.error(t('batchSummaryCodeIsInvalid'))
        } else if (!selectedData?.[0]?.amount) {
            toast.error(t("amountIsARequiredField"))
        } else if (!selectedData?.[0]?.invoice_date) {
            toast.error(t("invoiceDateIsARequiredField"))
        } else if (!selectedData?.[0]?.quantity) {
            toast.error(t("quantityIsARequiredField"))
        } else if (!selectedData?.[0]?.unit_price) {
            toast.error(t("unitPriceIsARequiredField"))
        } else {
            const data = {
                batch_summary_code: selectedData?.[0]?.batch_summary_code,
                mode: 'individual',
                order_data: [selectedData?.[0]],
            };
            listInquiryUpdateMutation
                .mutateAsync(['POST', 'bulk/', data])
                .then(response => {
                    if (response?.errors?.length > 0) {
                        toast.error(t('errorUploadingOrderData'));
                    } else {
                        setOpen(false);
                        setIsAddClicked(false);
                        toast.success(t('orderDataUploadedSuccessfully'));
                        successHandler()
                        closeHandler()
                    }

                })
                .catch((err: AxiosError) => {
                    const errData: any = err?.response?.data;
                    errData &&
                        Object.keys(errData).forEach(eachErr => {
                            eachErr && toast.error(t('batchSummaryCodeIsInvalid'));
                        });
                });

        }

    };



    return <>
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="overlay" />
                <Dialog.Content className="modal-content2  px-8 py-6">
                    <form
                        className="space-y-8"
                    >
                        <Dialog.Title>
                            {
                                !mode ? <SubHeading title={t("comment")} /> : <SubHeading title={t('addOrder')} />
                            }

                        </Dialog.Title>
                        <div >
                            {!mode && <div>
                                <p>{t('orderComment')}</p>
                            </div>}


                            <ModalTable
                                data={[data] || []}
                                mode={mode}
                                columns={columns}
                                totalEntries={1}
                                allowHover
                                active={active}
                                setActive={setActive}
                                allowRowAddition={true}
                                showFooter
                                containsActions
                                containsCheckbox
                                pageSize={1}
                                page={1}
                                setCardData={setSelectedData}
                                clearSelection={clearSelection}
                                setClearSelection={() => setClearSelection(false)}
                                isAddClicked={isAddClicked}
                                setIsAddClicked={setIsAddClicked}
                            />
                        </div>

                        <div className="flex justify-end gap-4">

                            <Dialog.Close
                                className="bg-danger text-white px-6  h-9 rounded border border-danger hover:bg-white hover:text-danger"
                            >
                                {t('cancel')}
                            </Dialog.Close>
                            {active === 'update' ?
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    handleBulkUpdate()
                                }
                                } className="bg-primary text-white px-6  h-9 rounded border border-primary hover:bg-white hover:text-primary">
                                    {t('update')} {t('row')}
                                </button> :
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    handleRowAdd()
                                }
                                } className="bg-primary text-white px-6 h-9 rounded border border-primary hover:bg-white hover:text-primary">
                                    {t('add')} {t('row')}
                                </button>
                            }
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    </>;
}

export default withTranslation()(ListInquaryModal);



