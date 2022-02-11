import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';
import axios from 'axios';


function HighAdventureApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, 
        highAdventure, setHighAdventure, 
        highAdventuretotalSum, setHighAdventuretotalSum, 
        highAdventuretotalGroupSum, setHighAdventuretotalGroupSum,
        selectedHighAdventureItems, setSelectedHighAdventureItems, 
    } = context;    
    const [highAdventureDesc, setHighAdventureDesc] = useState(0);


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=100&activity_group_size=700&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setHighAdventure(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 
        //Getting Category Description from Website
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/700')
        .then(res => {
            setHighAdventureDesc(res.data.description);
        });
    }, [])
    
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
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    //Updating Pricing, Single and Group
    useEffect(()=> {
        setHighAdventuretotalSum(_highAdventuretotalSum)
        if ( groupType === 'overnight' ) {
            setHighAdventuretotalGroupSum((_highAdventuretotalSum * medianSize) * 0.75)
        } else {
            setHighAdventuretotalGroupSum((_highAdventuretotalSum * medianSize))
        }
    }, [_highAdventuretotalSum, medianSize, groupType])


    if ( groupType !== "" && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="highAdv">
                <ActivityHeader
                    title="High Adventure Activities"
                    total={'$' +  highAdventuretotalSum } 
                />
                <p className="single-activity-description">
                    {  highAdventureDesc }
                </p>
                <ul className="no-bullets">
                    {highAdventure.map(({ id, title, acf, link  }, index) => {
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
                        let adminTitle = newTitle + ' (' + newPrice + '/PER)';
                        highAdventure[index].newPrice = newPrice;
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

                                            let _items = selectedHighAdventureItems?.HighAdventure ?? [];
                                            if (!checkedState[id]){
                                                _items.push(adminTitle)
                                                setSelectedHighAdventureItems({
                                                    ...selectedHighAdventureItems,
                                                    HighAdventure: _items
                                                })
                                            }
                                            else {
                                                _items = _items.filter(item=>item !== adminTitle);
                                                setSelectedHighAdventureItems({
                                                    ...selectedHighAdventureItems,  _items
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

export const highAdventuretotalSum = () => {}
export default HighAdventureApp;