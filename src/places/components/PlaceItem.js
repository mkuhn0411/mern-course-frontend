import React, { useState, useContext } from "react";

import Modal from '../../shared/components/UIElements/Modal';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from '../../shared/context/auth-context'
import './PlaceItem.css';

const PlaceItem = props => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const toggleMap = boolean => {
        setShowMap(boolean);
    }

    const toggleConfirmHandler = boolean => {
        setShowConfirmModal(boolean);
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
    }

    return (
        <>
            <Modal 
                show={showMap}
                onCancel={() => toggleMap(false)} 
                header={props.address} 
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={() => toggleMap(false)}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={() => toggleConfirmHandler(false)}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={() => toggleConfirmHandler(false)}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place?</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.description}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={() => toggleMap(true)}>VIEW ON MAP</Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.isLoggedIn && <Button danger onClick={() => toggleConfirmHandler(true)}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem;