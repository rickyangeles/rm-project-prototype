import React, { useState } from 'react';
import './Activities.css';
import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
import { isOvernight } from '../RetreatSelection/RetreatType';

const horsePrograms = [
    { price: 111, label: "Farm Animal Experience", link: "https://refreshingmountain.com/activities/farm-animal-experience/" },
    { price: 153, label: "Horse Rides - Tethered", link: "https://refreshingmountain.com/activities/horse-rides/" },
];

export var horseProgramsTotalPrice;

const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

function HorseProgramsApp() {
    const [checkedState, setCheckedState] = useState(
        new Array(horsePrograms.length).fill(false)
    );

    const [total, setTotal] = useState(0);

    const handleOnChange = (position) => {
        if (constHours !== "" && medianSize !== "") {
            const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            );

            setCheckedState(updatedCheckedState);

            const totalPrice = updatedCheckedState.reduce(
                (sum, currentState, index) => {
                    if (currentState === true) {
                        if (isOvernight === false) {
                            console.log(horsePrograms[index].label);
                            return sum + ((horsePrograms[index].price * constHours) / medianSize);
                        }
                        else if (isOvernight === true) {
                            console.log(horsePrograms[index].label);
                            return sum + (((horsePrograms[index].price * constHours) / medianSize) * 0.75);
                        }
                    }
                    return sum;
                },
                0
            );

            setTotal(totalPrice);
            horseProgramsTotalPrice = totalPrice;
        }
        else {
            alert("Please Select a Retreat Size First and a Retreat Type First");
        }

    };

    return (
        <div className="single-activity-section" id="horsePro">
            <div className="single-activity-header">
                <div className="activity-name">
                <h3 className="heading-style">Horse Program</h3>
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
                {horsePrograms.map(({ label, link, desc, price }, index) => {
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

export default HorseProgramsApp;