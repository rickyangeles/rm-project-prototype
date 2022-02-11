import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


function GeneralRecreationApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType,
        generalRecreation, setGeneralRecreation,
        generalRecreationtotalSum, setGeneralRecreationtotalSum, 
        generalRecreationtotalGroupSum, setGeneralRecreationtotalGroupSum ,
        selectedGeneralRecreationItems, setSelectedGeneralRecreationItems,
    } = context;
    const [generalRecreationDesc, setGeneralRecreationDesc] = useState("");


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=100&activity_group_size=704&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
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
    
    const _generalRecreationtotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value 
                ? accumulator +
                generalRecreation.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setGeneralRecreationtotalSum(_generalRecreationtotalSum)

        if ( groupType === 'overnight' ) {
            setGeneralRecreationtotalGroupSum((_generalRecreationtotalSum * medianSize) * 0.75)
        } else {
            setGeneralRecreationtotalGroupSum((_generalRecreationtotalSum * medianSize))
        }
    }, [_generalRecreationtotalSum, medianSize, groupType])


    if ( groupType !== "" && medianSize !== 80 ) {
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

                                            if (!checkedState[id]  ){
                                                let _items = selectedGeneralRecreationItems?.HighAdventure ?? [];
                                                _items.push(adminTitle)
                                                setSelectedGeneralRecreationItems({
                                                    ...selectedGeneralRecreationItems,
                                                    GeneralRecreation: _items
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


export const GeneralRecreationtotalSum = () => {}
export default GeneralRecreationApp;