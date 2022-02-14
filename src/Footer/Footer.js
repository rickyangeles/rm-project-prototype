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
    const highAdvActString = highAdvActArray ? highAdvActArray.join(', ') : 'Nothing Selected';

    const teamBuildingActArray = selectedTeamBuildingItems['TeamBuilding'];
    const teamBuildingActString = teamBuildingActArray?.join(', ');

    const wildLifeActArray = selectedWildLifeItems['WildLife'];
    const wildLifeActString = wildLifeActArray?.join(', ');

    const horseActArray = selectedHorseProgramsItems['HorsePrograms'];
    const horseActString = horseActArray?.join(', ');

    const genRecActArray = selectedGeneralRecreationItems['GeneralRecreation'];
    const genRecActString = genRecActArray?.join(', ');

    const poolPartyActArray = selectedPoolPartyItems['PoolParty'];
    const poolPartyActString = poolPartyActArray?.join(', ');
    
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

        // console.log("HighAdventure:", highAdvActArray);
        // console.log("Team Building:", teamBuildingActArray);
        // console.log("Wildlife:", wildLifeActArray);
        // console.log("Horse:", horseActArray);
        // console.log("Gen Rec:", genRecActArray);
        // console.log("Pool:", poolPartyActArray);
        console.log(groupSize);
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
            <MDBFooter className={sideBarClass} id="horseProg">
                <h3>Your Group Price Estimate</h3>
                <div>
                    <h4>Average Price Per Person</h4>
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
                    {groupSize !== '80+ Persons'?<Totals />: null}
            
                    <p className="text-center"><strong>Group Type Discounts: </strong>Day Groups may be eligible for discount with week day bookings, Monday through Friday.</p>
                    <p className="text-center">*Group events are price as a flat rate. This “pp” estimate is meant to help with planning, but final billing will be set as a flat price, with a min/max # of people that the schedule can accommodate</p>
                </div>
            </MDBFooter>
        </div>
    )
}

export default FooterApp;