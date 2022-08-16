import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import ActivityHeader from './ActivityHeader';


function GeneralRecreationApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, groupEventType, groupSize,
        generalRecreation, setGeneralRecreation,
        generalRecreationtotalSum, setGeneralRecreationtotalSum, 
        generalRecreationtotalGroupSum, setGeneralRecreationtotalGroupSum ,
        selectedGeneralRecreationItems, setSelectedGeneralRecreationItems,
    } = context;
    const [generalRecreationDesc, setGeneralRecreationDesc] = useState("");


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=10&activity_group_size=704&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setGeneralRecreation(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 

        //Getting Category Description from Website
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/704')
        .then(res => {
            setGeneralRecreationDesc(res.data.description);
        });
    }, [])
    
    const [checkedState, setCheckedState] = useState(
        new Array(generalRecreation.length).fill(false)
    );
    
    //Updating Pricing, Single and Group
    useEffect(()=> {
        const _generalRecreationtotalSum =  Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value 
                ? accumulator +
                generalRecreation.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
        )
        setGeneralRecreationtotalSum(_generalRecreationtotalSum)
        setGeneralRecreationtotalGroupSum((_generalRecreationtotalSum * medianSize)) 
    }, [checkedState, medianSize, groupType])

    if ( groupType !== 0 && medianSize !== 80 && groupEventType !== 'Team Building'  ) {
        return (
            <>
            <div className="single-activity-section" id="genRec">
                <ActivityHeader
                    title="General Recreation Activities"
                    total={'$' +  generalRecreationtotalSum } 
                />
                <p className="single-activity-description">
                    {  generalRecreationDesc }
                </p>
                <ul className="no-bullets">
                    {generalRecreation.map(({ id, title, acf, link  }, index) => {
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

                        let adminTitle = newTitle;
                        generalRecreation[index].newPrice = newPrice;

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

                                            let _items = selectedGeneralRecreationItems?.GeneralRecreation ?? [];
                                            if (!checkedState[id]  ){    
                                                _items.push(adminTitle)
                                                setSelectedGeneralRecreationItems({
                                                    ...selectedGeneralRecreationItems,
                                                    GeneralRecreation: _items
                                                })
                                            } else {
                                                _items = _items.filter(item=>item !== adminTitle);
                                                setSelectedGeneralRecreationItems({
                                                    ...selectedGeneralRecreationItems,
                                                    GeneralRecreation: _items
                                                })
                                            }
                                            
                                            
                                        }}
                                    />
                                    <label>
                                        <a href={link}>{newTitle}</a> <span>${Math.round(newPrice)}/PER</span>
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


export const GeneralRecreationtotalSum = () => {}
export default GeneralRecreationApp;