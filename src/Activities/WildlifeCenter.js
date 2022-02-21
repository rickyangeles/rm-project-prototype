import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


function WildlifeCenterApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, 
        wildLife, setWildLife,
        wildLifetotalSum, setWildLifetotalSum, 
        wildLifetotalGroupSum, setWildLifetotalGroupSum,
        selectedWildLifeItems, setSelectedWildLifeItems,
    } = context;
    const [wildLifeDesc, setWildLifeDesc] = useState(0);


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=10&activity_group_size=702&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setWildLife(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 

        //Getting Category Description from Website
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/702')
        .then(res => {
            setWildLifeDesc(res.data.description);
        });
    }, [])

    const [checkedState, setCheckedState] = useState(
        new Array(wildLife.length).fill(false)
    );

    //Updating Pricing, Single and Group
    useEffect(()=> {
        const _wildLifetotalSum =  Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value 
                ? accumulator +
                wildLife.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
        )
        setWildLifetotalSum(_wildLifetotalSum)
        setWildLifetotalGroupSum((_wildLifetotalSum * medianSize)) 
    }, [checkedState, medianSize, groupType])

    if ( groupType !== 0 && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="wildlife">
                <ActivityHeader
                    title="Wildlife Activities" 
                    total={'$' +  wildLifetotalSum} 
                />
                <p className="single-activity-description">
                    { wildLifeDesc }
                </p>
                <ul className="no-bullets">
                    {wildLife.map(({ id, title, acf, link  }, index) => {
                        let newPrice = 0;
                        let newTitle = title.rendered;
                        
                        if (groupType === "day") {
                            newPrice = (Math.round(acf.price) * constHours) / medianSize;
                        }else if ( groupType === "overnight") {
                            newPrice = ((Math.round(acf.price) * constHours) / medianSize) * 0.75;
                        } else {
                            newPrice = 0;
                        }
                        newPrice = Math.round(newPrice);

                        let adminTitle = newTitle.replace('&#038;', '&');
                        wildLife[index].newPrice = newPrice;

                        if ( acf.hide_in_app === false ) { 
                            return (
                                <li key={id}>
                                    <input
                                        className='ck'
                                        type="checkbox"
                                        defaultChecked={!!checkedState[index]}
                                        onChange={() => {
                                            setCheckedState({
                                                ...checkedState,
                                                [id]: !checkedState[id]
                                            });

                                            let _items = selectedWildLifeItems?.WildLife ?? [];
                                            if (!checkedState[id]  ){
                                                _items.push(adminTitle)
                                                setSelectedWildLifeItems({
                                                    ...selectedWildLifeItems,
                                                    WildLife: _items
                                                })
                                            } else {
                                                _items = _items.filter(item=>item != adminTitle);
                                                setSelectedWildLifeItems({
                                                    ...selectedWildLifeItems,
                                                    WildLife: _items
                                                })
                                            }
                                            
                                        }}
                                    />
                                    <label>
                                        <a href={link}>{newTitle.replace('&#038;', '&')}</a> <span>${Math.round(newPrice)}/PER</span>
                                        {/* <p>{desc}</p> */}
                                    </label>
                                </li>
                            );
                        }
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