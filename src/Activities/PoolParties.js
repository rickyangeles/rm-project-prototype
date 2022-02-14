import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


function PoolPartiesApp() {
    const context = useContext(AppContext);
    const {
        constHours, medianSize, groupType, 
        poolParties, setPoolParties,
        poolPartytotalSum, setPoolPartytotalSum, 
        poolPartytotalGroupSum, setPoolPartytotalGroupSum,
        selectedPoolPartyItems, setSelectedPoolPartyItems
    } = context;
    const [poolPartyDesc, setPoolPartyDesc] = useState("");


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=10&activity_group_size=705&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setPoolParties(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 

        //Getting Category Description from Website
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/705')
        .then(res => {
            setPoolPartyDesc(res.data.description);
        });
        
    }, [medianSize, groupType])

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
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
          ),
        [checkedState, medianSize, groupType]
    );

    useEffect(()=> {
        setPoolPartytotalSum(_poolPartytotalSum)
        setPoolPartytotalGroupSum((_poolPartytotalSum * medianSize))
    }, [_poolPartytotalSum, medianSize, groupType, poolPartytotalGroupSum, checkedState])


    if ( groupType !== 0 && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="pool">
                <ActivityHeader
                    title="Pool Activities" 
                    total={'$' +  poolPartytotalSum} 
                />
                <p className="single-activity-description">
                    { poolPartyDesc }
                </p>
                <ul className="no-bullets">
                {poolParties.map(({ id, title, acf, link  }, index) => {
                        let newPrice = 0;
                        let newTitle = title.rendered;
                    
                        if (groupType === "day") {
                            newPrice = (Math.round(acf.price) * constHours) / medianSize;
                        }else {
                            newPrice = ((Math.round(acf.price) * constHours) / medianSize) * 0.75;
                        }
                        newPrice = Math.round(newPrice);

                        let adminTitle = newTitle;
                        poolParties[index].newPrice = newPrice;
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

                                            let _items = selectedPoolPartyItems?.PoolParty ?? [];
                                            if (!checkedState[id]  ){
                                                _items.push(adminTitle)
                                                setSelectedPoolPartyItems({
                                                    ...selectedPoolPartyItems,
                                                    PoolParty: _items
                                                })
                                            }
                                            else {
                                                _items = _items.filter(item=>item != adminTitle);
                                                setSelectedPoolPartyItems({
                                                    ...selectedPoolPartyItems,
                                                    PoolParty: _items
                                                })
                                            }
                                            
                                        }}
                                    />
                                    <label>
                                        <a href={link}>{newTitle}</a> <span>${newPrice}/PER</span>
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
export const poolPartytotalSum = () => {}
export default PoolPartiesApp; 