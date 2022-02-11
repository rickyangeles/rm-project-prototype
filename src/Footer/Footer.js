import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBFooter } from "mdbreact";
import { Link } from 'react-scroll';
import './Footer.css';

import { teambuildingTotalPrice } from '../Activities/Teambuilding';
import { poolPartiesTotalPrice } from '../Activities/PoolParties';
import {AppContext} from '../AppContext'
import { groupType } from '../RetreatSelection/RetreatType';

function getFormattedPrice(price) {
    return `${price.toFixed(2)}`;
}

let sideBarClass = 'estimate-sidebar';
let groupPrice = 0;
let groupSizeString = "";

function FooterApp() {
    const context = useContext(AppContext);
    const { 
        groupSize, 
        medianSize, 
        groupType,
        highAdventuretotalSum, highAdventuretotalGroupSum,
        generalRecreationtotalSum, generalRecreationtotalGroupSum, 
        wildLifetotalSum, wildLifetotalGroupSum, 
        teamBuildingtotalSum, teamBuildingtotalGroupSum, 
        horseProgramstotalSum, horseProgramstotalGroupSum,
        poolPartytotalSum, poolPartytotalGroupSum, 
        totalGroupPrice, setTotalGroupPrice,
        selectedHighAdventureItems, setSelectedHighAdventureItems,
        selectedHorseProgramsItems, setSelectedHorseProgramsItems,
        selectedWildLifeItems, setSelectedWildLifeItems,
        selectedTeamBuildingItems, setSelectedTeamBuildingItems,
        selectedGeneralRecreationItems, setSelectedGeneralRecreationItems,
        selectedPoolPartyItems, setSelectedPoolPartyItems
    } = context;
    
    const highAdvActArray = selectedHighAdventureItems['HighAdventure'];
    const highAdvActString = highAdvActArray?.join();
    const teamBuildingActArray = selectedTeamBuildingItems['TeamBuilding'];
    const wildLifeActArray = selectedWildLifeItems['WildLife'];
    const horseActArray = selectedHorseProgramsItems['HorsePrograms'];
    const genRecActArray = selectedGeneralRecreationItems['GeneralRecreation'];
    const poolPartyActArray = selectedPoolPartyItems['PoolParty'];
    

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=> {
        //Array with all prices
        let allPrices = [
            generalRecreationtotalSum,
            wildLifetotalSum,
            highAdventuretotalSum,
            teamBuildingtotalSum,
            horseProgramstotalSum,
            poolPartytotalSum]; 
        

        console.log("HighAdventure:", highAdvActArray);
        console.log("Team Building:", teamBuildingActArray);
        console.log("Wildlife:", wildLifeActArray);
        console.log("Horse:", horseActArray);
        console.log("Gen Rec:", genRecActArray);
        console.log("Pool:", poolPartyActArray);

        if ( highAdvActArray ) {
            const highAdvActString = highAdvActArray.map((item, index) => ( item ));
            console.log(highAdvActString);
        }
        

        
        //Remove any undefined values from array
        let filteredPrices = allPrices.filter(function(x) {
            return x !== undefined;
        });
        const sum = filteredPrices.reduce((result,number)=> result+number);
        setTotalPrice(sum);
        
        if ( medianSize < 80 ) {
            sideBarClass = 'estimate-sidebar';
        } else {
            sideBarClass = 'estimate-sidebar dim-sidebar';
        }
        const groupTotal = highAdventuretotalGroupSum + generalRecreationtotalGroupSum + wildLifetotalGroupSum + teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum;
        
        setTotalGroupPrice(highAdventuretotalGroupSum + generalRecreationtotalGroupSum + wildLifetotalGroupSum + teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum);
    }, [groupType, medianSize, highAdventuretotalGroupSum, generalRecreationtotalGroupSum, wildLifetotalGroupSum,teamBuildingtotalGroupSum,horseProgramstotalGroupSum,poolPartytotalGroupSum])


    return (
        
        
        <div>
            <MDBFooter className={sideBarClass} id="horseProg">
                <h3>Your Group Price Estimate</h3>
                <div>
                    <h4>Average Price Per Person</h4>
                    <ul>
                        <li><Link activeClass={"active"} to="highAdv" spy={true} offset={-20} smooth={true} duration={700}>High Adventure Activities<span>${ Math.round( highAdventuretotalGroupSum )}</span></Link></li>
                        <li><Link activeClass="active" to="teamBuild" spy={true} offset={-20} smooth={true} duration={700}>Teambuilding Activities<span>${ Math.round( teamBuildingtotalGroupSum )}</span></Link></li>
                        <li><Link activeClass="active" to="wildlife" spy={true} offset={-20} smooth={true} duration={700}>Wildlife Center Activities<span>${ Math.round (wildLifetotalGroupSum )}</span></Link></li>
                        <li><Link activeClass="active" to="horsePro" spy={true} offset={-20}smooth={true} duration={700}>Horse Program Activities<span>${ Math.round( horseProgramstotalGroupSum )}</span></Link></li>
                        <li><Link activeClass="active" to="genRec" spy={true} offset={-20} smooth={true} duration={700}>General Recreation Activities<span> ${ Math.round( generalRecreationtotalGroupSum ) }</span></Link> </li>
                        <li><Link activeClass="active" to="pool" spy={true} offset={-20} smooth={true} duration={700}>Pool Parties <span>${ Math.round( poolPartytotalGroupSum )}</span></Link></li>
                        <li><strong>Total <span>${ Math.round(totalGroupPrice) }</span></strong></li>
                    </ul>
                    <div className="finalPrice">
                        
                        <div>
                            <span>{ totalPrice }</span> 
                            <span>Per Person Estimate</span> 
                        </div>
                        <div>
                            <a href=
                                { 
                                    'https://refreshingmountain.com/day-activity-calculator-results/?' +
                                    'size='             + groupSize  +
                                    '&type='            + groupType +

                                    // '&highAdv='         + highAdventuretotalSum +
                                    // '&highAdvAct='      + highAdvActArray ?? '' + 

                                    '&teamBld='         + teamBuildingtotalSum +
                                    '&teamBldAct='      + teamBuildingActArray?.join() ?? '' + 

                                    '&wildLife='        + wildLifetotalSum +
                                    '&twildLifeAct='    + wildLifeActArray?.join() ?? '' + 

                                    '&horsePrg='        + horseProgramstotalSum +
                                    '&horsePrgAct='     + horseActArray?.join() ?? '' + 

                                    '&genRec='          + generalRecreationtotalSum +
                                    '&genRecAct='       + genRecActArray?.join() ?? '' + 
                                    
                                    '&poolPrty='        + poolPartytotalSum +
                                    '&poolPrtyAct='     + poolPartyActArray?.join() ?? '' + 
                                    
                                    '&total='           + totalPrice 
                                } 
                                
                                className="click-price-btn">Send Copy</a>
                        </div> 
                    </div>
            
                    <p className="text-center"><strong>Group Type Discounts: </strong>Day Groups may be eligible for discount with week day bookings, Monday through Friday.</p>
                    <p className="text-center">*Group events are price as a flat rate. This “pp” estimate is meant to help with planning, but final billing will be set as a flat price, with a min/max # of people that the schedule can accommodate</p>
                </div>
            </MDBFooter>
        </div>
    )
}

export default FooterApp;