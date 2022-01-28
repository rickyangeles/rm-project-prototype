import React from 'react';

const ActivityHeader = ({ title, total, desc}) => {
    
    return (
        <div className="single-activity-header">
            <div className="activity-name">
                <h3 className="heading-style"> {title}</h3>
            </div>
            <div className="activity-per-person">
                <div>
                    <p>Average Price Per Person:</p>
                    <span>{total}</span>
                </div>
            </div>
        </div>
    );
}



export default ActivityHeader;