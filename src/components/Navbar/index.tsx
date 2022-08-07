import React, { useState } from 'react';

type NavbarProps = {
    listItem: string[]
    showUserLocation: boolean,
}

const Navbar = ({ listItem, showUserLocation }: NavbarProps)  => {

    // state
    const [ userLocation, setUserLocation ] = useState("")

    return (
        <div>
            { showUserLocation && <p>User location: {}</p> }
            <ul>
                { listItem.map((item: string) => ( <li>{ item }</li>))}
            </ul>
        </div>
    )
}

export default Navbar