import React, { useState } from 'react';
import './Activities.css';
import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
import { isOvernight } from '../RetreatSelection/RetreatType';

const highAdventure = [
    { price: 267, label: "2 Ziplines - Flying V", link: "https://refreshingmountain.com/activities/2-ziplines-the-flying-v-run/" },
    { price: 537, label: "5 Ziplines + 9 Obstacles", link: "https://refreshingmountain.com/activities/5-ziplines-and-high-ropes-the-challenge-adventure-run/" },
    { price: 199, label: "Climbing Tower (Outdoor)", link: "https://refreshingmountain.com/activities/climbing-tower-outdoor/" },
    { price: 128, label: "Climbing Tower (Indoor)", link: "https://refreshingmountain.com/activities/indoor-climbing-wall/" },
    { price: 267, label: "22 Elevated Obstacles", link: "https://refreshingmountain.com/activities/elevated-obstacle-course-2/" },
    { price: 153, label: "Giant Ladder", link: "https://refreshingmountain.com/activities/giant-ladder/" },
    { price: 153, label: "Giant Swing", link: "https://refreshingmountain.com/activities/giant-swing/" },
    { price: 153, label: "Rappelling", link: "https://refreshingmountain.com/activities/rappelling/" },
];

export var highAdventureTotalPrice;

const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

function HighAdventureApp() {
    const [checkedState, setCheckedState] = useState(
        new Array(highAdventure.length).fill(false)
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
                            console.log(highAdventure[index].label);
                            return sum + ((highAdventure[index].price * constHours) / medianSize);
                        }
                        else if (isOvernight === true) {
                            console.log(highAdventure[index].label);
                            return sum + (((highAdventure[index].price * constHours) / medianSize) * 0.75);
                        }
                    }
                    return sum;
                },
                0
            );

            setTotal(totalPrice);
            highAdventureTotalPrice = totalPrice;
        }
        else {
            alert("Please Select a Retreat Size First and a Retreat Type First");
        }

    };

    return (
        <div className="single-activity-section" id="highAdv">
            <div className="single-activity-header">
                <div className="activity-name">
                <h3 className="heading-style">High Adventure Activities</h3>
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
                {highAdventure.map(({ label, link, desc, price }, index) => {
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

export default HighAdventureApp;