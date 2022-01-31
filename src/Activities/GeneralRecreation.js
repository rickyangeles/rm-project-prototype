import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';
//export var genRecTotalPrice = 0;


const genRec = [
    { key: 0, price: 88, label: "Archery", link: "https://refreshingmountain.com/activities/archery/" },
    { key: 1, price: 48, label: "Campfire", link: "https://refreshingmountain.com/activities/campfires/" },
    { key: 2, price: 88, label: "GPS Nature Hunt", link: "https://refreshingmountain.com/activities/gps-nature-hunt-navigation/" },
    { key: 3, price: 88, label: "Orienteering", link: "https://refreshingmountain.com/activities/orienteering-navigation/" },
    { key: 4, price: 199, label: "Paintball Targets", link: "https://refreshingmountain.com/activities/paintball-target-shooting-course/" },
    { key: 5, price: 153, label: "Pedal Carts", link: "https://refreshingmountain.com/activities/pedal-carts/" },
    { key: 6, price: 88, label: "Slingshots", link: "https://refreshingmountain.com/activities/sling-shots-4/" },
];

function GeneralRecreationApp() {

    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, generalRecreationtotalSum, setGeneralRecreationtotalSum, generalRecreationtotalGroupSum, setGeneralRecreationtotalGroupSum } = context;

    const [checkedState, setCheckedState] = useState(
        new Array(genRec.length).fill(false)
    );
    
    const _generalRecreationtotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                genRec.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setGeneralRecreationtotalSum(_generalRecreationtotalSum)
        setGeneralRecreationtotalGroupSum((_generalRecreationtotalSum * medianSize))
    }, [_generalRecreationtotalSum])

    if ( groupType !== "" && medianSize !== 80 ) {
        return (
            <>
                <div className="single-activity-section" id="genRec">
                    <ActivityHeader
                        title="General Recreation Activities"
                        total={'$' +  generalRecreationtotalSum} 
                    />
                    <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                    <ul className="no-bullets">
                        {genRec.map(({ price, label, link, desc, key }, index) => {
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
                            genRec[key].newPrice = newPrice;
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
            </>
        );
    }
    else {
        return false;
    }
}

export const GeneralRecreationtotalSum = () => {}
export default GeneralRecreationApp;