"use client";

import { useState } from "react";
import CalendarBlocks from "./components/CalendarBlocks/CalendarBlocks";
import React from "react";
import DayPopup from "./components/DayView/DayView";
import styles from './CalendarView.module.css'
import { useRef, useEffect } from "react";

//Create a day type array of [DayID, DayName, times[]] and then convert this into an array object to create an array item for each day of week.
//This can be extended to create a calendar in theory by expanding the list.
//TODO move to type file
type DayTypeObject = {
    id: number;
    day: string;
    times: string[];
}
//TODO move to type file
type DayTypeArray = {
    daysOfTheWeek: DayTypeObject[];
  };


//TODO remove this, currently hard coded but this is the schema imports from the DB have to folow

let daysOfTheWeek = [
    { id: 0, day: "Monday", times: [] },
    { id: 1, day: "Tuesday", times: [] },
    { id: 2, day: "Wednesday", times: [] },
    { id: 3, day: "Thursday", times: [] },
    { id: 4, day: "Friday", times: [] },
    { id: 5, day: "Saturday", times: [] },
    { id: 6, day: "Sunday", times: [] }
  ];

export default function CalendarView(){
    //popupREf cretes a use ref for the div containing the popup box to edit times. 
    const popupRef = useRef<HTMLDivElement>(null);
    //day select holds the array for the current day selected so that the name and times of that day can be rendered. Boolean is used to track tatus of if a day
    //is selected and the popup menu should be rendered.
    const [daySelect, setDaySelect] = React.useState<DayTypeArray | null>(null); 
    const [daySelectedBool, setDaySelectedBoolean] = React.useState(false);



    const onDayClick = (day: DayTypeObject) => {
        setDaySelect({ daysOfTheWeek: [day] });
        setDaySelectedBoolean(true);
        console.log(day)
    };

    //Should clear the popup, clear the selected day function and bring the user back to the calendar view laying under the popup
    const offDayClick = () => {
        setDaySelect( null );
        setDaySelectedBoolean(false);
    };
    const secondaryClick = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          offDayClick(); // Call offDayClick only if the click was outside the popup
        }
      };
      
      //Event listner is mounter when secondary click is created, cleans up the listener to not rerender the screen when the div is removed
      useEffect(() => {
        // Add event listener to detect outside clicks
        document.addEventListener("mousedown", secondaryClick);
        
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", secondaryClick);
        };
    }, []);
      
    //Probably a cleaner way to render the DayPop and it's related div, but we'll get to that later
    //TODO clean up this block of code
    return(
        <div className={styles.container}>
            <CalendarBlocks daysOfTheWeek={daysOfTheWeek} onDayClick={onDayClick} offDayClick={offDayClick}/>

            {daySelect && daySelectedBool && 
            (<div ref={popupRef} className={styles.PopupDiv}> <DayPopup dayOfTheWeek={daySelect} daySelectedBool={daySelectedBool} />
            </div>)}
        </div>
        
    );
}

