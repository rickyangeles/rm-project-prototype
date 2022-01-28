import React from 'react';

const Total = ({ activities }) => {

    const totalPoints = activities.reduce( ( total, activity ) => {
        return total + activity.acf.price;
    }, 0);
    return (
       <div> { Math.trunc(totalPoints) } </div>
    );
}

export default Total;