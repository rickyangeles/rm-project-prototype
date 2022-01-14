import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBFooter } from "mdbreact";
import { Link } from 'react-scroll';
import './Footer.css';

import { genRecTotalPrice } from '../Activities/GeneralRecreation';
import { wildlifeCenterTotalPrice } from '../Activities/WildlifeCenter';
import { highAdventureTotalPrice } from '../Activities/HighAdventure';
import { horseProgramsTotalPrice } from '../Activities/HorsePrograms';
import { teambuildingTotalPrice } from '../Activities/Teambuilding';
import { poolPartiesTotalPrice } from '../Activities/PoolParties';

function getFormattedPrice(price) {
    return `${price.toFixed(2)}`;
}

function FooterApp() {
    const [genRecState, setGenRecState] = useState(0);

    const handleOnChange = () => {
        //Array with all prices
        let allPrices = [genRecTotalPrice,wildlifeCenterTotalPrice,highAdventureTotalPrice,teambuildingTotalPrice,horseProgramsTotalPrice,poolPartiesTotalPrice]; 
        
        //Remove any undefined values from array
        let filteredPrices = allPrices.filter(function(x) {
            return x !== undefined;
        });

        console.log(filteredPrices);
        if (genRecTotalPrice == null) {
            alert("Please make an activity selection first");
        }
        else if (genRecTotalPrice != null) {
            const sum =  filteredPrices.reduce((result,number)=> result+number);
            console.log(sum)
            setGenRecState(sum.toFixed(0));
        }
    };

    return (
        <div>
            <MDBFooter className="estimate-sidebar" id="horseProg">
                <h3>Your Group Price Estimate</h3>
                <div>
                    <h4>Average Price Per Person</h4>
                    <ul>
                        <li><Link activeClass="active" to="genRec" spy={true} offset={-20} smooth={true} duration={700}>General Recreation Activities<span> ${ Math.round(genRecTotalPrice) }</span></Link> </li>
                        <li><Link activeClass="active" to="wildlife" spy={true} offset={-20} smooth={true} duration={700}>Wildlife Center Activities<span>${ Math.round(wildlifeCenterTotalPrice)}</span></Link></li>
                        <li><Link activeClass="active" to="highAdv" spy={true} offset={-20} smooth={true} duration={700}>High Adventure Activities<span>${ Math.round(highAdventureTotalPrice)}</span></Link></li>
                        <li><Link activeClass="active" to="teamBuild" spy={true} offset={-20} smooth={true} duration={700}>Teambuilding Activities<span>${ Math.round(teambuildingTotalPrice)}</span></Link></li>
                        <li><Link activeClass="active" to="horsePro" spy={true} offset={-20}smooth={true} duration={700}>Horse Program Activities<span>${ Math.round(horseProgramsTotalPrice)}</span></Link></li>
                        <li><Link activeClass="active" to="pool" spy={true} offset={-20} smooth={true} duration={700}>Pool Parties <span>${ Math.round(poolPartiesTotalPrice)}</span></Link></li>
                    </ul>
                    <div className="finalPrice">
                        <div>
                            <span>{ genRecState }</span> 
                            <span>Per Person Estimate</span> 
                        </div>
                        <div>
                            <button className="click-price-btn" onClick={handleOnChange}>Click for Price</button>
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