import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';
import ActivityItem from './ActivityItem';

const poolParties = [
    { key: 0, price: 319, label: "< 60 People", link: "https://refreshingmountain.com/activities/pool-parties-private-use/" },
    { key: 1, price: 398, label: "61-120 People", link: "https://refreshingmountain.com/activities/pool-parties-private-use/" },
    { key: 2, price: 499, label: "120+ People", link: "https://refreshingmountain.com/activities/pool-parties-private-use/" },
]


function PoolPartiesApp() {
    
    const context = useContext(AppContext);
    const {constHours, medianSize, poolPartytotalSum, setPoolPartytotalSum } = context;

    const [checkedState, setCheckedState] = useState(
        new Array(poolParties.length).fill(false)
    );

    const _poolPartytotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                poolParties.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setPoolPartytotalSum(_poolPartytotalSum)
    }, [_poolPartytotalSum])

    if ( constHours !== "" && medianSize < 80 ) {
        return (
            <>
                <div className="single-activity-section" id="highAdv">
                    <ActivityHeader
                        title="Pool Parties"
                        total={'$' +  poolPartytotalSum} 
                    />
                    <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                    <ul className="no-bullets">
                        {poolParties.map(({ price, label, link, desc, key }, index) => {
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
                            poolParties[key].newPrice = newPrice;
                            
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
        );}
    else {
        return false; 
    }
}
export const poolPartytotalSum = () => {}
export default PoolPartiesApp; 