import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


function HorseProgramsApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, 
        horsePrograms, setHorsePrograms, 
        horseProgramstotalSum, setHorseProgramstotalSum, 
        horseProgramstotalGroupSum, setHorseProgramstotalGroupSum,
        selectedHorseProgramsItems, setSelectedHorseProgramsItems,
    } = context;
    const [horseProgDesc, setHorseProgDesc] = useState("");
 

    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=10&activity_group_size=703&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setHorsePrograms(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 
        //Getting Category Description from Website
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/703')
        .then(res => {
            setHorseProgDesc(res.data.description);
        });
    }, [])

    const [checkedState, setCheckedState] = useState(
        new Array(horsePrograms.length).fill(false)
    );
    
    //Updating Pricing, Single and Group
    useEffect(()=> {
        const _horseProgramstotalSum =  Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value 
                ? accumulator +
                horsePrograms.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
        )
        setHorseProgramstotalSum(_horseProgramstotalSum)
        setHorseProgramstotalGroupSum((_horseProgramstotalSum * medianSize)) 
    }, [checkedState, medianSize, groupType])

    
    if ( groupType !== 0 && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="horsePro">
                <ActivityHeader
                    title="Horse Program Activities"
                    total={'$' +  horseProgramstotalSum} 
                />
                <p className="single-activity-description">
                    {  horseProgDesc }
                </p>
                <ul className="no-bullets">
                    {horsePrograms.map(({ id, title, acf, link  }, index) => {
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
                        horsePrograms[index].newPrice = newPrice;
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
                                            let _items = selectedHorseProgramsItems?.HorsePrograms ?? [];
                                            if (!checkedState[id]  ){
                                                _items.push(adminTitle)
                                                setSelectedHorseProgramsItems({
                                                    ...selectedHorseProgramsItems,
                                                    HorsePrograms: _items
                                                })
                                            } else {
                                                _items = _items.filter(item=>item != adminTitle);
                                                setSelectedHorseProgramsItems({
                                                    ...selectedHorseProgramsItems,
                                                    HorsePrograms: _items
                                                })
                                            }
                                            
                                        }}
                                    />
                                    <label>
                                        <a href={link}>{newTitle}</a> <span>${newPrice}/PER</span>
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

export const horseProgramsTotalSum = () => {}
export default HorseProgramsApp;