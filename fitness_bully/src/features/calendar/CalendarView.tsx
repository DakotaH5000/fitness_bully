"use client";

import { useState } from "react";
import CalendarBlocks from "./components/CalendarBlocks/CalendarBlocks";
import React from "react";
import DayPopup from "./components/DayView/DayView";
import styles from './CalendarView.module.css'
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

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

export default function CalendarView(){

    
    const { data: session } = useSession();
    //popupREf cretes a use ref for the div containing the popup box to edit times. 
    const popupRef = useRef<HTMLDivElement>(null);
    //day select holds the array for the current day selected so that the name and times of that day can be rendered. Boolean is used to track tatus of if a day
    //is selected and the popup menu should be rendered.
    const [daySelect, setDaySelect] = React.useState<DayTypeArray | null>(null); 
    const [daySelectedBool, setDaySelectedBoolean] = React.useState(false);

    const [daysOfTheWeek, setDaysOfTheWeek] = useState<DayTypeObject[]>([
        //If not declared "as string[] throws an error for having a type of never"
        { id: 0, day: "Monday", times: [] as string[] },
        { id: 1, day: "Tuesday", times: [] as string[] },
        { id: 2, day: "Wednesday", times: [] as string[] },
        { id: 3, day: "Thursday", times: [] as string[] },
        { id: 4, day: "Friday", times: [] as string[] },
        { id: 5, day: "Saturday", times: [] as string[] },
        { id: 6, day: "Sunday", times: [] as string[] },
      ]);
    
      // Step 2: Update times for a specific day
      const updateTimes = (dayId: number, newTime: string) => {
        setDaysOfTheWeek(prevDays => 
            //map over thecurrent Days array, if requested Day.id === requested Day.id, and time is not in the array already, insert it and this will be passed to the component to render!
            //else, leave it alone
          prevDays.map(day => 
            day.id === dayId && !day.times.includes(newTime)
              ? { ...day, times: [...day.times, newTime] }  // Append new time to the existing times array
              : day
          )
        );
      };

      async function timesLoader(session: any): Promise<void> {
            console.log(`UID is ${session.user.user_id}`)
            const res = await fetch(`/api/db/UserTimes?user_id=${session.user.user_id}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            console.log("TimesLoader")
            const timesArray = await res.json();
            for(let i=0; i<timesArray.length; i++){
                const dayID: number  = timesArray[i].DAY
                const val:string= timesArray[i].Times;
                const update = await updateTimes(dayID, val)
            }

            console.log(daysOfTheWeek)
      };

      useEffect(() => {
        if (session && session.user){
        timesLoader(session);
        }
    }, [session]);

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

