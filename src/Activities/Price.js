import React from 'react';
// import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
// import { isOvernight } from '../RetreatSelection/RetreatType';

const Price = ({ index, price, changeScore}) => {
  
    return (
        
        <span>{ Math.trunc(price) }/PER</span>
    );
    
}

export default Price;