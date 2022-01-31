import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';

// const highAdventure = [
//     {key:0,  price: 267, label: "2 Ziplines - Flying V", link: "https://refreshingmountain.com/activities/2-ziplines-the-flying-v-run/" },
//     {key:1,  price: 537, label: "5 Ziplines + 9 Obstacles", link: "https://refreshingmountain.com/activities/5-ziplines-and-high-ropes-the-challenge-adventure-run/" },
//     {key:2, price: 199, label: "Climbing Tower (Outdoor)", link: "https://refreshingmountain.com/activities/climbing-tower-outdoor/" },
//     {key:3, price: 128, label: "Climbing Tower (Indoor)", link: "https://refreshingmountain.com/activities/indoor-climbing-wall/" },
//     {key:4, price: 267, label: "22 Elevated Obstacles", link: "https://refreshingmountain.com/activities/elevated-obstacle-course-2/" },
//     {key:5, price: 153, label: "Giant Ladder", link: "https://refreshingmountain.com/activities/giant-ladder/" },
//     {key:6, price: 153, label: "Giant Swing", link: "https://refreshingmountain.com/activities/giant-swing/" },
//     {key:7, price: 153, label: "Rappelling", link: "https://refreshingmountain.com/activities/rappelling/" },
// ];

//const getFormattedPrice = (price) => `$${price.toFixed(0)}`;

function HighAdventureApp() {

    const context = useContext(AppContext);
    const {highAdventure, constHours, medianSize, groupType, highAdventuretotalSum, setHighAdventuretotalSum, highAdventuretotalGroupSum, setHighAdventuretotalGroupSum} = context;
    
    
    const [checkedState, setCheckedState] = useState(
        new Array(highAdventure.length).fill(false)
    );
    
    const _highAdventuretotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                highAdventure.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setHighAdventuretotalSum(_highAdventuretotalSum)
        setHighAdventuretotalGroupSum((_highAdventuretotalSum * medianSize))
    }, [_highAdventuretotalSum])


    if ( groupType !== "" && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="highAdv">
                <ActivityHeader
                    title="High Adventure Activities"
                    total={'$' +  highAdventuretotalSum} 
                />
                <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                <ul className="no-bullets">
                    {highAdventure.map(({ price, label, link, desc, key }, index) => {
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
                        highAdventure[key].newPrice = newPrice;
                        highAdventure[key].checked = newPrice;
    
                        
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
    } else {
        return false;
    }
}

export const highAdventuretotalSum = () => {}
export default HighAdventureApp;