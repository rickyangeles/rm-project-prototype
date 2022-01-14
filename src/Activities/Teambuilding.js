import React, { useState } from 'react';
import './Activities.css';
import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
import { isOvernight } from '../RetreatSelection/RetreatType';

const teambuilding = [
    { price: 230, label: "Escape Room (max of 10)", link: "https://refreshingmountain.com/activities/escape-room-ranch/" },
    { price: 88, label: "Field Games", link: "https://refreshingmountain.com/activities/field-games/" },
    { price: 88, label: "Physical Challenge Course", link: "https://refreshingmountain.com/activities/physical-challenge-course/" },
    { price: 88, label: "Team Scavenger Hunt", link: "https://refreshingmountain.com/activities/team-scavenger-hunt/" },
    { price: 138, label: "Team Puzzle Hunt", link: "https://refreshingmountain.com/activities/team-puzzlehunt/" },
    { price: 138, label: "Teambuilding - 1 hour", link: "https://refreshingmountain.com/activities/teambuilding-2/" },
    { price: 221, label: "Teambuilding - 2 hours", link: "https://refreshingmountain.com/activities/teambuilding-2/" },
];

export var teambuildingTotalPrice = 0;

const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

function TeambuildingApp() {
    const [checkedState, setCheckedState] = useState(
        new Array(teambuilding.length).fill(false)
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
                            console.log(teambuilding[index].label);
                            return sum + ((teambuilding[index].price * constHours) / medianSize);
                        }
                        else if (isOvernight === true) {
                            console.log(teambuilding[index].label);
                            return sum + (((teambuilding[index].price * constHours) / medianSize) * 0.75);
                        }
                    }
                    return sum;
                },
                0
            );

            setTotal(totalPrice);
            teambuildingTotalPrice = totalPrice;
        }
        else {
            alert("Please Select a Retreat Size First and a Retreat Type First");
        }

    };

    return (
        <div className="single-activity-section" id="teamBuild">
            <div className="single-activity-header">
                <div className="activity-name">
                <h3 className="heading-style">Team Building Activities</h3>
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
                {teambuilding.map(({ label, link, desc, price }, index) => {
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

export default TeambuildingApp;