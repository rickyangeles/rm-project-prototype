import React, { useState } from 'react';
import axios from 'axios';
import './Activities.css';
import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
import { isOvernight } from '../RetreatSelection/RetreatType';




const baseRESTURL = 'https://refreshingmountain.com/wp-json/wp/v2/activities/';
function getActivityInfo(id) {
    let restURL = baseRESTURL + id; 


    axios.get(restURL)
  .then(response => {
    console.log(response.data.acf);
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
};

console.log(getActivityInfo(18712));

const genRec = [
    { price: 88, label: "Archery", link: "https://refreshingmountain.com/activities/archery/", desc: "test" },
    { price: 44, label: "Campfire", link: "https://refreshingmountain.com/activities/campfires/", desc: "test"  },
    { price: 88, label: "GPS Nature Hunt", link: "https://refreshingmountain.com/activities/gps-nature-hunt-navigation/", desc: "test"  },
    { price: 88, label: "Orienteering", link: "https://refreshingmountain.com/activities/orienteering-navigation/", desc: "test"  },
    { price: 199, label: "Paintball Targets", link: "https://refreshingmountain.com/activities/paintball-target-shooting-course/", desc: "test"  },
    { price: 153, label: "Pedal Carts", link: "https://refreshingmountain.com/activities/pedal-carts/", desc: "test"  },
    { price: 88, label: "Slingshots", link: "https://refreshingmountain.com/activities/sling-shots-4/", desc: "test"  },
];



export var genRecTotalPrice = 0;

const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

function GeneralActivitiesApp() {
    const [checkedState, setCheckedState] = useState(
        new Array(genRec.length).fill(false)
    );

    const [total, setTotal] = useState(0);

    const handleOnChange = (position) => {
        if (constHours !== "" && medianSize !== "" && isOvernight !== "") {
            const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            );

            setCheckedState(updatedCheckedState);

            const totalPrice = updatedCheckedState.reduce(
                (sum, currentState, index) => {
                    if (currentState === true) {
                        if (isOvernight === false) {
                            console.log(genRec[index].label);
                            return sum + ((genRec[index].price * constHours) / medianSize);
                        }
                        else if (isOvernight === true) {
                            console.log(genRec[index].label);
                            return sum + (((genRec[index].price * constHours) / medianSize) * 0.75);
                        }
                    }
                    return sum;
                },
                0
            );
            
            setTotal(totalPrice);
            genRecTotalPrice = totalPrice;
        }
        else {
            alert("Please Select a Retreat Size and a Retreat Type First");
        }
    };

    return (
        <div className="single-activity-section" id="genRec">
            <div className="single-activity-header">
                <div className="activity-name">
                <h3 className="heading-style">General Recreation Activities</h3>
                </div>
                <div className="activity-per-person">
                    <div>
                    <p>Average Price Per Person:</p>
                    <span>{getFormattedPrice(total)}</span>
                    </div>
                </div>
            </div>

            <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
            
            <ul className="no-bullets">
                {genRec.map(({ label, link, desc, price }, index) => {
                if (constHours !== "" && medianSize !== "" && isOvernight !== "") {
                    if (isOvernight === false) {
                        //console.log(genRec[index].label);
                        price = Math.round((price * constHours) / medianSize);
                    }
                    else if (isOvernight === true) {
                        //console.log(genRec[index].label);
                        price = Math.round(((price * constHours) / medianSize) * 0.75);
                    } else if (isOvernight === null) {
                        price = 0;
                    }
                }else {
                    price = 0;
                }
                    return (
                        <li key={index}>
                            <input
                                className='ck'
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={label}
                                value={label}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                            />
                            <label>
                                <a href={link}>{label}</a> <span>${price}/PER</span>
                                <p>{desc}</p>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


export default GeneralActivitiesApp;