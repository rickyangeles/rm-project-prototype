import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';
import ActivityItem from './ActivityItem';

const horsePrograms = [
    { key: 0, price: 111, label: "Farm Animal Experience", link: "https://refreshingmountain.com/activities/farm-animal-experience/" },
    { key: 1, price: 153, label: "Horse Rides - Tethered", link: "https://refreshingmountain.com/activities/horse-rides/" },
];


function HorseProgramsApp() {

    const context = useContext(AppContext);
    const {constHours, medianSize, horseProgramstotalSum, setHorseProgramstotalSum } = context;

    const [checkedState, setCheckedState] = useState(
        new Array(horsePrograms.length).fill(false)
    );


    const _horseProgramsTotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                horsePrograms.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setHorseProgramstotalSum(_horseProgramsTotalSum)
    }, [_horseProgramsTotalSum])

    if ( constHours !== "" && medianSize < 80 ) {
        return (
            <div className="single-activity-section" id="highAdv">
                <ActivityHeader
                    title="Horse Program Activities"
                    total={'$' +  horseProgramstotalSum} 
                />
                <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                <ul className="no-bullets">
                    {horsePrograms.map(({ label, link, desc, price, key }, index) => {
                        let newPrice = 0;
                        if (constHours !== "" && medianSize !== "" && isOvernight !== "") {
                            if (isOvernight === false) {
                                //console.log(genRec[index].label);
                                newPrice = Math.round((price * constHours) / medianSize);
                            }
                            else if (isOvernight === true) {
                                //console.log(genRec[index].label);
                                newPrice = Math.round(((price * constHours) / medianSize) * 0.75);
                            } else if (isOvernight === null) {
                                newPrice = 0;
                            }
                        }else {
                            newPrice = 0;
                        }
                        horsePrograms[key].newPrice = newPrice;
                        return (
                            <li key={index}>
                                <input
                                    className='ck'
                                    type="checkbox"
                                    defaultChecked={!!checkedState[index]}
                                    onChange={() => {
                                    setCheckedState({
                                        ...checkedState,
                                        [index]: !checkedState[index]
                                        });
                                    }}
                                />
                                <label>
                                    <a href={link}>{label}</a> <span>${newPrice}/PER</span>
                                    <p>{desc}</p>
                                </label>
                        </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return false;
    }
}
export const horseProgramsTotalSum = () => {}
export default HorseProgramsApp;