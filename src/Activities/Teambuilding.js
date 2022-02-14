import React, { useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


function TeambuildingApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, 
        teamBuilding, setTeamBuilding,
        teamBuildingtotalSum, setTeamBuildingtotalSum, 
        teamBuildingtotalGroupSum, setTeamBuildingtotalGroupSum, 
        selectedTeamBuildingItems, setSelectedTeamBuildingItems,
    } = context;
    const [teamBuildingDesc, setTeamBuildingDesc] = useState(0);


    useEffect(() => {
        //Call to get the activties for this category
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activities?per_page=10&activity_group_size=701&_fields[]=id&_fields[]=title&_fields[]=acf.price&_fields[]=acf.hide_in_app&_fields[]=link')
        .then(res => {
            setTeamBuilding(res.data);
        })
        .catch((error) => {
            console.log(error)
        }); 
        //Call to get the category description
        axios.get('https://refreshingmountain.com/wp-json/wp/v2/activity_group_size/701')
        .then(res => {
            setTeamBuildingDesc(res.data.description);
        });
    }, [medianSize, groupType])

    const [checkedState, setCheckedState] = useState(
        new Array(teamBuilding.length).fill(false)
    );

    const _teamBuildingtotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value 
                ? accumulator +
                teamBuilding.find(
                    (subscriber) => subscriber.id + "" === key
                  )?.newPrice
                : accumulator,
            0
          ),
        [checkedState, medianSize, groupType]
    );

    //Updating Pricing, Single and Group
    useEffect(()=> {
        setTeamBuildingtotalSum(Math.round(_teamBuildingtotalSum))
        setTeamBuildingtotalGroupSum((_teamBuildingtotalSum * medianSize))
    }, [_teamBuildingtotalSum, medianSize, groupType])
    

    if ( groupType !== 0 && medianSize !== 80 ) {
        return (
            <>
            <div className="single-activity-section" id="teamBuild">
                <ActivityHeader
                    title="Teambuilding Activities"
                    total={'$' +  teamBuildingtotalSum} 
                />
                <p className="single-activity-description">
                    {  teamBuildingDesc }
                </p>
                <ul className="no-bullets">
                    {teamBuilding.map(({ id, title, acf, link  }, index) => {
                        let newPrice = 0;
                        let newTitle = title.rendered;
                        
                        if (groupType === "day") {
                            newPrice = (Math.round(acf.price) * constHours) / medianSize;
                        }else {
                            newPrice = ((Math.round(acf.price) * constHours) / medianSize) * 0.75;
                        }

                        let adminTitle = newTitle;
                        
                        teamBuilding[index].newPrice = newPrice;
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
                                            let _items = selectedTeamBuildingItems?.TeamBuilding ?? [];
                                            if ( !checkedState[id] ){
                                               
                                                _items.push(adminTitle)
                                                setSelectedTeamBuildingItems({
                                                    ...selectedTeamBuildingItems,
                                                    TeamBuilding: _items
                                                })
                                            } else {
                                                _items = _items.filter(item=>item != adminTitle);
                                                setSelectedTeamBuildingItems({
                                                    ...selectedTeamBuildingItems,
                                                    TeamBuilding: _items
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

export const teamBuildingtotalSum = () => {}
export default TeambuildingApp;