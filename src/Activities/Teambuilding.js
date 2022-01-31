import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';

const teambuilding = [
    { key:0, price: 230, label: "Escape Room (max of 10)", link: "https://refreshingmountain.com/activities/escape-room-ranch/" },
    { key:1, price: 88, label: "Field Games", link: "https://refreshingmountain.com/activities/field-games/" },
    { key:2, price: 88, label: "Physical Challenge Course", link: "https://refreshingmountain.com/activities/physical-challenge-course/" },
    { key:3, price: 88, label: "Team Scavenger Hunt", link: "https://refreshingmountain.com/activities/team-scavenger-hunt/" },
    { key:4, price: 138, label: "Team Puzzle Hunt", link: "https://refreshingmountain.com/activities/team-puzzlehunt/" },
    { key:5, price: 138, label: "Teambuilding - 1 hour", link: "https://refreshingmountain.com/activities/teambuilding-2/" },
    { key:6, price: 221, label: "Teambuilding - 2 hours", link: "https://refreshingmountain.com/activities/teambuilding-2/" },
];


function TeambuildingApp() {
    const context = useContext(AppContext);
    const {constHours, medianSize, groupType, teamBuildingtotalSum, setTeamBuildingtotalSum, teamBuildingtotalGroupSum, setTeamBuildingtotalGroupSum, } = context;

    const [checkedState, setCheckedState] = useState(
        new Array(teambuilding.length).fill(false)
    );

    const _teamBuildingtotalSum = useMemo(
        () =>
          Object.entries(checkedState).reduce(
            (accumulator, [key, value]) =>
              value
                ? accumulator +
                teambuilding.find(
                    (subscriber) => subscriber.key + "" === key
                  ).newPrice
                : accumulator,
            0
          ),
        [checkedState]
    );

    useEffect(()=> {
        setTeamBuildingtotalSum(_teamBuildingtotalSum)
        setTeamBuildingtotalGroupSum((_teamBuildingtotalSum * medianSize))
    }, [ _teamBuildingtotalSum])

    if ( groupType !== "" && medianSize !== 80 ) {
        return (
            <div className="single-activity-section" id="teamBuild">
                <ActivityHeader
                    title="Team Building Activities"
                    total={'$' +  teamBuildingtotalSum} 
                />
                <p className="single-activity-description">Nunc interdum lacus sit amet orci. Quisque id mi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Pellentesque commodo eros a enim.</p>
                <ul className="no-bullets">
                    {teambuilding.map(({ label, link, desc, price, key }, index) => {
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
                        teambuilding[key].newPrice = newPrice;

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
        );
    } else {
        return false;
    }
}

export const teamBuildingtotalSum = () => {}
export default TeambuildingApp;