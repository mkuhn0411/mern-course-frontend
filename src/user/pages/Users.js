import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        { 
            id: 'u1', 
            name: 'Al Horford', 
            image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3213.png&w=350&h=254', 
            places: 3
        }
    ];

    return <UsersList items={USERS}/>
}

export default Users;