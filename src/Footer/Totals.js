import React, { useContext } from 'react';

import { AppContext } from '../AppContext';


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
                <span>{Math.round(totalPrice)}</span> 
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