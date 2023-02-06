import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import './PlaceForm.css';

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

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const place = DUMMY_PLACES.find(place => place.id === placeId);

    useEffect(() => { 
        if (place) {
            setFormData(
                {
                    title: {
                        value: place.title,
                        isValid: true
                    },
                    description: {
                        value: place.description,
                        isValid: true
                    }
                },
            true
            )
        }
        setIsLoading(false);
    }, [setFormData, place]);
    

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    if (!place) {
        return (
            <div className="centered">
                <Card>
                    <h2>Could not find place</h2>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
             <Input 
                id="description" 
                element="textarea" 
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    )
};

export default UpdatePlace;