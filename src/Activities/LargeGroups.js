import React, { useEffect, useMemo, useState, useContext } from 'react';
import './Activities.css';
import { AppContext } from '../AppContext';
import { isOvernight } from '../RetreatSelection/RetreatType';
import ActivityHeader from './ActivityHeader';


const genRec = [
    { key: 0, price: 88, label: "Archery", link: "https://refreshingmountain.com/activities/archery/" },
    { key: 1, price: 48, label: "Campfire", link: "https://refreshingmountain.com/activities/campfires/" },
    { key: 2, price: 88, label: "GPS Nature Hunt", link: "https://refreshingmountain.com/activities/gps-nature-hunt-navigation/" },
    { key: 3, price: 88, label: "Orienteering", link: "https://refreshingmountain.com/activities/orienteering-navigation/" },
    { key: 4, price: 199, label: "Paintball Targets", link: "https://refreshingmountain.com/activities/paintball-target-shooting-course/" },
    { key: 5, price: 153, label: "Pedal Carts", link: "https://refreshingmountain.com/activities/pedal-carts/" },
    { key: 6, price: 88, label: "Slingshots", link: "https://refreshingmountain.com/activities/sling-shots-4/" },
];

function LargeGroupsApp() {

    const context = useContext(AppContext);
    const {constHours, medianSize, generalRecreationtotalSum, setGeneralRecreationtotalSum, } = context;

    // const context = useContext(AppContext);
    // const {constHours, medianSize, generalRecreationtotalSum, setGeneralRecreationtotalSum, } = context;

    // const [checkedState, setCheckedState] = useState(
    //     new Array(genRec.length).fill(false)
    // );
    
    // const _generalRecreationtotalSum = useMemo(
    //     () =>
    //       Object.entries(checkedState).reduce(
    //         (accumulator, [key, value]) =>
    //           value
    //             ? accumulator +
    //             genRec.find(
    //                 (subscriber) => subscriber.key + "" === key
    //               ).newPrice
    //             : accumulator,
    //         0
    //       ),
    //     [checkedState]
    // );

    // useEffect(()=> {
    //     setGeneralRecreationtotalSum(_generalRecreationtotalSum)
    // }, [_generalRecreationtotalSum])


    if ( constHours !== "" && medianSize == 80 ) {
        return (
            <>
                <div className="single-activity-section" id="genRec">
                    <div className="single-activity-header">
                        <div className="activity-name">
                            <h3 className="heading-style">For Large Groups</h3>
                        </div>
                    </div>
                    <p className="single-activity-description">Due to the time and heavier coordination required to get large groups combination of activities, we'd love to talk to you about the vision for your day.
                        We have successfully hosted groups of nearly 300 for a day retreat, and we're confident we can make it work for you!
                        <a href="" className="inquiry-btn">Send Inqury</a>
                    </p>
                </div>
            </>
        );
    } else {
        return false;
    }
}

export default LargeGroupsApp;