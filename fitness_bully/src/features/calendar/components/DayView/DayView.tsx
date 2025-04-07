'use client';

import style from './DayView.module.css'

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

    //This should render an H1 of the day.day and some sort of display for all times within the selected day, as well as a method to add more times to the list. 
    //TODO add a wiring to the data base to synchronize db and times added within this day view.
    if(daySelectedBool){
        return(
            <div className={style.container}>
                <h1>Bool is true</h1>
            </div>
        );
    }
    
    return(
        <>
        </>
    );
}