import React, { useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';

function NothingSelectedAPp() {

    return (
        <>
            <div className="nothing-selected-alert">
                <h2>Please select Group Size and <br></br> Group Type to view activities</h2>
            </div>
        </>
    );
}

export default NothingSelectedAPp;