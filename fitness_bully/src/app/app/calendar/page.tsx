'use client';

import styles from "./page.module.css";

import CalendarView from "@/features/calendar/CalendarView";

export default function Calendar(){
    return (
        <div className={styles.container}> {/* Flex container for centering */}
            <div className={styles.calendarView}> {/* Apply styling for the calendar */}
                <CalendarView />
            </div>
        </div>
    );
}