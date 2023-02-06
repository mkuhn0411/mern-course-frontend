import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'Come see it',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '350 Fifth Avenue',
        creatorId: 'u1',
        location: {
            lat: 40.78,
            lng: -73.99
        }
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'Come see it',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '350 Fifth Avenue',
        creatorId: 'u2',
        location: {
            lat: 40.78,
            lng: -73.99
        }
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId);

    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces;