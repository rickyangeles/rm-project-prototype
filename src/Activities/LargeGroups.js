import React, { useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';

function LargeGroupsApp() {

    const context = useContext(AppContext);
    const {constHours, medianSize} = context;

    if ( constHours !== "" && medianSize === 80 ) {
        return (
            <>
                <div className="single-activity-section" id="genRec">
                    <div className="single-activity-header">
                        <div className="activity-name">
                            <h3 className="heading-style">For Large Groups</h3>
                        </div>
                    </div>
                    <p className="single-activity-description">Due to the time and heavier coordination required to get large groups combination of activities, we'd love to talk to you about the vision for your day.
                        We have successfully hosted groups of nearly 300 for a day retreat, and we're confident we can make it work for you!
                        <a href="https://refreshingmountain.com/retreats/" className="inquiry-btn">Send Inqury</a>
                    </p>
                </div>
            </>
        );
    } else {
        return false;
    }
}

export default LargeGroupsApp;