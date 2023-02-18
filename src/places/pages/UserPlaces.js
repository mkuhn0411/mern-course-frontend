import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places)
            } catch (err) {}
        }

        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className="center"><LoadingSpinner /></div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
        </>
    )
}

export default UserPlaces;