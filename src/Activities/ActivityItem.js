import React, {useState} from "react";
import { constHours, medianSize } from '../RetreatSelection/RetreatSize';
import { isOvernight } from '../RetreatSelection/RetreatType';


function ActivityItem(props) {

    return(   
        <li key={props.index}>
            <input
                className='ck'
                type="checkbox"
                id={`custom-checkbox-${props.index}`}
                name={props.label}
                value={props.label}
                //checked={props.checkedState[props.index]}
                onChange={() => props.handleOnChange(props.index)}
            />
            <label>
                <a href={props.link}>{props.label}</a> <span>${props.price}/PER</span>
                <p>{props.desc}</p>
            </label>
        </li>
    )
}


export default ActivityItem;
