import React, { useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';

function NothingSelectedAPp() {

    const context = useContext(AppContext);
    const { groupType, medianSize } = context;

    if ( groupType === "" && medianSize !== 80 ) {
        return (
            <>
                <div className="nothing-selected-alert">
                    <h2>Please select Group Size and <br></br> Group Type to view activities</h2>
                </div>
            </>
        );
    } else {
        return false;
    }
}

export default NothingSelectedAPp;