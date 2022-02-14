import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import { Link } from 'react-scroll';
import NumberFormat from 'react-number-format';


function Totals() {
    const context = useContext(AppContext);
    const {groupSize, groupType, 
        totalPrice, 
        highAdventuretotalGroupSum,
        highAdvActArray,
        teamBuildingtotalGroupSum,
        teamBuildingActString,
        wildLifetotalGroupSum,
        wildLifeActString,
        horseProgramstotalGroupSum,
        horseActString,
        generalRecreationtotalGroupSum,
        genRecActString,
        poolPartytotalGroupSum,
        poolPartyActString,
        totalGroupPrice
    } = context;


    return(
        
        <div className="finalPrice">
            
            <div>
                <span>{totalPrice}</span> 
                <span>Per Person Estimate</span> 
            </div>
            <div>
                <a href=
                    { 
                        'https://refreshingmountain.com/day-activity-calculator-results/?' +
                        'size='             + groupSize  +
                        '&type='            + groupType +

                        '&highAdv='         + highAdventuretotalGroupSum +
                        '&highAdvAct='      + highAdvActArray + 

                        '&teamBld='         + teamBuildingtotalGroupSum +
                        '&teamBldAct='      + teamBuildingActString + 

                        '&wildLife='        + wildLifetotalGroupSum +
                        '&wildLifeAct='     + wildLifeActString + 

                        '&horsePrg='        + horseProgramstotalGroupSum +
                        '&horsePrgAct='     + horseActString + 

                        '&genRec='          + generalRecreationtotalGroupSum +
                        '&genRecAct='       + genRecActString + 
                        
                        '&poolPrty='        + poolPartytotalGroupSum +
                        '&poolPrtyAct='     + poolPartyActString + 
                        
                        '&total='           + totalPrice + 
                        '&groupTotal='      + totalGroupPrice 
                    } 
                    
                    className="click-price-btn" target="_blank;">Send Copy</a>
            </div>
        </div>
    )
}
export default Totals;