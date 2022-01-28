import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';
import ActivityItem from './ActivityItem';

const wildlifeCenter = [
    { key:0, price: 138, label: "Birds of Prey", link: "https://refreshingmountain.com/activities/birds-of-prey/" },
    { key:1, price: 203, label: "Large Group Presentation", link: "https://refreshingmountain.com/activities/large-group-reptile-and-amphibian-presentation/" },
    { key:2, price: 111, label: "Pond and Stream", link: "" },
    { key:3, price: 111, label: "Reptiles and Amphibians", link: "" },
    { key:4, price: 138, label: "Toxic Plants and Animals", link: "" },
    { key:5, price: 111, label: "Wildlife of PA", link: "" },
    { key:6, price: 111, label: "Wildlife Center OPEN TIME", link: "https://refreshingmountain.com/activities/wildlife-center-free-time/" },
    { key:7, price: 138, label: "Wilderness Survival (1 hr.)", link: "" },
    { key:8, price: 221, label: "Wilderness Survival (2 hrs.)", link: "" },
];


function WildlifeCenterApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, wildLifetotalSum, setWildLifetotalSum, } = context;

    const [checkedState, setCheckedState] = useState(
        new Array(wildlifeCenter.length).fill(false)
    );

    // useEffect(()=>{
    //     axios.get(`https://refreshingmountain.com/wp-json/wp/v2/activities?include=18712,18755,18746,18744,18708,18714`)
    //     .then(res => {
    //         setwildlifeCenter(res.data)
           
    //     })
    // }, [])
    const _wildLifetotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                wildlifeCenter.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setWildLifetotalSum(_wildLifetotalSum)
    }, [_wildLifetotalSum])


    if ( constHours !== "" && medianSize < 80 ) {
        return (
            <>
            <div className="single-activity-section" id="wildlife">
                <ActivityHeader
                    title="Wildlife Activities" 
                    total={'$' +  wildLifetotalSum} 
                />
                <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                <ul className="no-bullets">
                    {wildlifeCenter.map(({ price, label, link, desc, key }, index) => {
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
                        wildlifeCenter[key].newPrice = newPrice;
                        
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
export const wildLifetotalSum = () => {}
export default WildlifeCenterApp;