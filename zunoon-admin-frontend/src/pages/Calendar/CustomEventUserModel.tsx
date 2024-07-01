import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { withTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import "./custommodel.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
    title?: string;
    show?: boolean;
    handleClose: () => void;
    handleClickSubmit: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    t: any;
    assignedEventDetails: any
};

const CustomEventUserModal = ({ handleClose, show, handleClickSubmit, t, title, assignedEventDetails }: PropsType) => {
    const [active, setActive] = useState(true)

    const startDate = new Date(assignedEventDetails?.startDate).toLocaleString()

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title className='heading'>
                    <div className='model_heading'>
                        <h1>{assignedEventDetails?.title}</h1>
                        <h2>{startDate}</h2>
                        <h2>{assignedEventDetails?.description}</h2>
                    </div>
                    <FontAwesomeIcon icon={faClose} onClick={handleClose} />
                </Modal.Title>
            </Modal.Header>
            <div className='acknowledged_title'>
                <p onClick={() => setActive(true)} className={active ? 'active_assigned' : ""}>{t("acknowledged_by")}</p>
                <p onClick={() => setActive(false)} className={active ? '' : "active_assigned"}>{t("not_acknowledged_by")}</p>
            </div>
            {
                active ?
                    <Modal.Body className='acknowledged_list'>
                        {
                            assignedEventDetails?.acknowledgedBy &&
                            assignedEventDetails?.acknowledgedBy.map((item) => {
                                return (<div key={item.id}>{item.username}</div>)
                            })
                        }
                    </Modal.Body>
                    :
                    <Modal.Body className='acknowledged_list'>
                        {
                            assignedEventDetails?.unAcknowledgedBy &&
                            assignedEventDetails?.unAcknowledgedBy.map((item) => {
                                return (<div key={item.id}>{item.username}</div>)
                            })
                        }
                    </Modal.Body>
            }

        </Modal>
    );
}

export default withTranslation()(CustomEventUserModal);