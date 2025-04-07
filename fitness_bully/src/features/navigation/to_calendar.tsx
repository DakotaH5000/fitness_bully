'use client';

import Link from "next/link";


export default function ToCalendar(){
    //TODO generate calendar based of users current calnedar, current implemenation will just be a HTML element with some styling. 

    return(
            <div>
                <Link href="/app/calendar">Calendar</Link>
            </div>
    );
}