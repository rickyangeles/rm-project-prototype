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
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=100&activity_group_size=702&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
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
    }, [medianSize, groupType])

    const [checkedState, setCheckedState] = useState(
        new Array(wildLife.length).fill(false)
    );

    const _wildLifetotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value  
                ? accumulator +
                wildLife.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
          ),
        [checkedState, medianSize, groupType]
    );

    useEffect(()=> {
        setWildLifetotalSum(_wildLifetotalSum);

        if ( groupType === 'overnight' ) {
            setWildLifetotalGroupSum((_wildLifetotalSum * medianSize) * 0.75)
        } else {
            setWildLifetotalGroupSum((_wildLifetotalSum * medianSize))
        }
    }, [_wildLifetotalSum, medianSize, groupType])


    if ( groupType !== "" && medianSize !== 80 ) {
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
                        
                        if (constHours !== "" && medianSize !== "" && isOvernight !== "") {
                            if (isOvernight === false) {
                                //console.log(genRec[index].label);
                                newPrice = Math.round((acf.price * constHours) / medianSize);
                            }
                            else if (isOvernight === true) {
                                //console.log(genRec[index].label);
                                newPrice = Math.round(((acf.price * constHours) / medianSize) * 0.75);
                            } else if (isOvernight === null) {
                                newPrice = 0;
                            }
                        }else {
                            newPrice = 0;
                        }

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
                                        <a href={link}>{newTitle.replace('&#038;', '&')}</a> <span>${newPrice}/PER</span>
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