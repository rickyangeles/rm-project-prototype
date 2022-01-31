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
        constHours, 
        medianSize, 
        highAdventuretotalSum, highAdventuretotalGroupSum,
        generalRecreationtotalSum, generalRecreationtotalGroupSum, 
        wildLifetotalSum, wildLifetotalGroupSum, 
        teamBuildingtotalSum, teamBuildingtotalGroupSum, 
        horseProgramstotalSum, horseProgramstotalGroupSum,
        poolPartytotalSum, poolPartytotalGroupSum, 
        totalGroupPrice, setTotalGroupPrice,
        highAdventure
    } = context;

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
        
        //Remove any undefined values from array
        let filteredPrices = allPrices.filter(function(x) {
            return x !== undefined;
        });
        const sum =  filteredPrices.reduce((result,number)=> result+number);
        setTotalPrice(sum);
        
        if ( medianSize < 80 ) {
            sideBarClass = 'estimate-sidebar';
        } else {
            sideBarClass = 'estimate-sidebar dim-sidebar';
        }
        const groupTotal = highAdventuretotalGroupSum + generalRecreationtotalGroupSum + wildLifetotalGroupSum + teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum;
        console.log(teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum);
        setTotalGroupPrice(highAdventuretotalGroupSum + generalRecreationtotalGroupSum + wildLifetotalGroupSum + teamBuildingtotalGroupSum + horseProgramstotalGroupSum + poolPartytotalGroupSum);
        
    })
    return (
        
        <div>
            <MDBFooter className={sideBarClass} id="horseProg">
                <h3>Your Group Price Estimate</h3>
                <div>
                    <h4>Average Price Per Person</h4>
                    <ul>
                        <li><Link activeClass={"active"} to="highAdv" spy={true} offset={-20} smooth={true} duration={700}>High Adventure Activities<span>${ Math.round( (highAdventuretotalSum * medianSize))}</span></Link></li>
                        <li><Link activeClass="active" to="teamBuild" spy={true} offset={-20} smooth={true} duration={700}>Teambuilding Activities<span>${ Math.round((teamBuildingtotalSum * medianSize))}</span></Link></li>
                        <li><Link activeClass="active" to="wildlife" spy={true} offset={-20} smooth={true} duration={700}>Wildlife Center Activities<span>${ Math.round((wildLifetotalSum * medianSize))}</span></Link></li>
                        <li><Link activeClass="active" to="horsePro" spy={true} offset={-20}smooth={true} duration={700}>Horse Program Activities<span>${ Math.round((horseProgramstotalSum * medianSize))}</span></Link></li>
                        <li><Link activeClass="active" to="genRec" spy={true} offset={-20} smooth={true} duration={700}>General Recreation Activities<span> ${ Math.round((generalRecreationtotalSum * medianSize)) }</span></Link> </li>
                        <li><Link activeClass="active" to="pool" spy={true} offset={-20} smooth={true} duration={700}>Pool Parties <span>${ Math.round((poolPartytotalSum * medianSize))}</span></Link></li>
                        <li><strong>&nbsp; <span>${ totalGroupPrice }</span></strong></li>
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
                                    'size='         + highAdventure  +
                                    '&type='        + groupType +
                                    '&highAdv='     + highAdventuretotalSum +
                                    '&teamBld='     + teamBuildingtotalSum +
                                    '&wildLife='    + wildLifetotalSum +
                                    '&horsePrg='    + horseProgramstotalSum +
                                    '&genRec='      + generalRecreationtotalSum +
                                    '&poolPrty='    + poolPartytotalSum +
                                    '&total='       + totalPrice 
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