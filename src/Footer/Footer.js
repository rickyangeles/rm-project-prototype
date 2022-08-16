import React, { useState, useContext, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBFooter } from "mdbreact";
import { Link } from 'react-scroll';
import Totals from './Totals';
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
        groupEventType,
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
    let highAdvActString = highAdvActArray ? highAdvActArray.join(', ') : 'N/A';
    if (highAdvActArray?.length === 0) { highAdvActArray.push('N/A'); }

    const teamBuildingActArray = selectedTeamBuildingItems['TeamBuilding'];
    let teamBuildingActString = teamBuildingActArray ? teamBuildingActArray.join(', ') : 'N/A';
    if (teamBuildingActArray?.length === 0) { teamBuildingActArray.push('N/A'); }


    const wildLifeActArray = selectedWildLifeItems['WildLife'];
    let wildLifeActString = wildLifeActArray ? wildLifeActArray.join(', ') : 'N/A';
    if (wildLifeActArray?.length === 0) { wildLifeActArray.push('N/A'); }

    const horseActArray = selectedHorseProgramsItems['HorsePrograms'];
    let horseActString = horseActArray ? horseActArray.join(', ') : 'N/A';
    if (horseActArray?.length === 0) { horseActArray.push('N/A'); }

    const genRecActArray = selectedGeneralRecreationItems['GeneralRecreation'];
    let genRecActString = genRecActArray ? genRecActArray.join(', ') : 'N/A';
    if (genRecActArray?.length === 0) { genRecActArray.push('N/A'); }

    const poolPartyActArray = selectedPoolPartyItems['PoolParty'];
    let poolPartyActString = poolPartyActArray ? poolPartyActArray.join(', ') : 'N/A';
    if (poolPartyActArray?.length === 0) { poolPartyActArray.push('N/A'); }
    
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

        console.log("HighAdventure:", highAdvActString);
        console.log("Team Building:", selectedTeamBuildingItems['TeamBuilding']);
        console.log("Wildlife:", wildLifeActString);
        console.log("Horse:", horseActString);
        console.log("Gen Rec:", genRecActString);
        console.log("Pool:", poolPartyActString);


        //Remove any undefined values from array
        let filteredPrices = allPrices.filter(function(x) {
            return x !== undefined;
        });
        const sum = filteredPrices.reduce((result,number)=> result+number);
        setTotalPrice(sum);

        setTotalGroupPrice(highAdventuretotalGroupSum + generalRecreationtotalGroupSum + wildLifetotalGroupSum + teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum);
    }, [groupType, medianSize, highAdventuretotalGroupSum, generalRecreationtotalGroupSum, wildLifetotalGroupSum,teamBuildingtotalGroupSum,horseProgramstotalGroupSum,poolPartytotalGroupSum])


    return (

        
        <div>
            <MDBFooter className={sideBarClass}>
                <h3>Your Group Price Estimate</h3>
                <div>
                    <ul>
                        <li><Link activeClass={"active"} to="highAdv" spy={true} offset={-20} smooth={true} duration={700}>High Adventure Activities<span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( highAdventuretotalGroupSum )} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></Link></li>
                        <li><Link activeClass="active" to="teamBuild" spy={true} offset={-20} smooth={true} duration={700}>Teambuilding Activities<span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( teamBuildingtotalGroupSum )} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></Link></li>
                        <li><Link activeClass="active" to="wildlife" spy={true} offset={-20} smooth={true} duration={700}>Wildlife Center Activities<span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( wildLifetotalGroupSum )} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }
                            </span></Link></li>
                        <li><Link activeClass="active" to="horsePro" spy={true} offset={-20}smooth={true} duration={700}>Horse Program Activities<span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( horseProgramstotalGroupSum )} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></Link></li>
                        <li><Link activeClass="active" to="genRec" spy={true} offset={-20} smooth={true} duration={700}>General Recreation Activities<span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( generalRecreationtotalGroupSum )} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></Link> </li>
                        <li><Link activeClass="active" to="pool" spy={true} offset={-20} smooth={true} duration={700}>Pool Parties <span>
                            {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( poolPartytotalGroupSum)} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></Link></li>
                        <li><strong>Total <span>
                        {groupSize !== '80+ Persons'?<NumberFormat value={ Math.round( totalGroupPrice ) } displayType={'text'} thousandSeparator={true} prefix={'$'} /> : null }</span></strong></li>
                    </ul>
                    {groupSize !== '80+ Persons'?
                    
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
                                    '&event='           + groupEventType +

                                    '&highAdv='         + highAdventuretotalGroupSum +
                                    '&highAdvAct='      + highAdvActString + 

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
                                
                                className="click-price-btn" target="_blank;">Submit Inquiry</a>
                        </div>
                    </div>
                    
                    : null}
                    
            
                    <p className="text-center"><strong>Group Type Discounts: </strong>Day Groups may be eligible for discount with week day bookings, Monday through Friday.</p>
                    <p className="text-center">*Group events are price as a flat rate. This “pp” estimate is meant to help with planning, but final billing will be set as a flat price, with a min/max # of people that the schedule can accommodate</p>
                    <p className="text-center">** The rates shown in this tool for “Overnight Group” apply to any event booked at Refreshing Mountain with at least 30 people, 2 nights of lodging, and 4 meals booked as a retreat package.  They represent a 25% discount on activities, which can be applied to any activities schedule that is part of the event and created at least 60+ days before the start date of the event.  Contact Guest Services for additional information on these discounts and scheduling.</p>
                </div>
            </MDBFooter>
        </div>
    )
}

export default FooterApp;