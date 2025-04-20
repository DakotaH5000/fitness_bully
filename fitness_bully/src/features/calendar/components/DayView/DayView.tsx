'use client';

import { MouseEventHandler } from 'react';
import style from './DayView.module.css'
import React from 'react';

//Same as with CalendarView, create a day, array of days to form a week, wrap those up with the selected day
//to determine if a Popup should be rendered and if so which one with what data
type DayType = {
    id: number;
    day: string;
    times: string[];
}

type DayTypeArray = {
    daysOfTheWeek: DayType[];
  };


type DayPopUpProps = {
    dayOfTheWeek: DayTypeArray;
    daySelectedBool: Boolean;
  };


export default function DayPopup({dayOfTheWeek, daySelectedBool}: DayPopUpProps){

    const [targetTime, setTargetTime] = React.useState("");
    const [times, setTimes] = React.useState<string[]>([]);
    

    const timeHandler = () =>{
        //TODO change this to be managed by a state
        const currentValue = document.querySelector('#inputVal') as HTMLInputElement | null;
        const newTime = currentValue?.value.trim();
        if(newTime && !times.includes(newTime)){
        setTimes([...times, newTime])
        console.log(newTime)
        console.log(times)
        }
    }


    const removeTime= (time:string) =>{
        //SEt time by retruning a filtered array with the targetd time
        setTimes(prevTimes => {
            const updatedTimes = [...prevTimes, time];
            return updatedTimes.filter((time) => updatedTimes.indexOf(time));
          });
    }

    //This should render an H1 of the day.day and some sort of display for all times within the selected day, as well as a method to add more times to the list. 
    //TODO add a wiring to the data base to synchronize db and times added within this day view.
    if(daySelectedBool){


        return(
            <div className={style.container}>
                <label>What times on {dayOfTheWeek.daysOfTheWeek[0].day}</label>
                <input id="inputVal" className={style.timeInput} type="time"></input>
                <button onClick={() => timeHandler()}>Add Time</button>
                <div>{times.map((time, index) =>
                <div className={style.timeRow}>
                    <p key={index}>{time}</p>
                    <button onClick={() => removeTime(time)}>X</button>
                    </div>
                    )}
                    </div>
            </div>
        );
    }
    
    return(
        <>
        </>
    );
}