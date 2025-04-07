import styles from './CalendarBlocks.module.css'

type DayType = {
    id: number;
    day: string;
    times: string[];
}

type CalendarBlocksProps = {
    daysOfTheWeek: DayType[];
    onDayClick: (day: DayType) => void;
    offDayClick: () => void;
  };

  type DayTypeObject = {
    id: number;
    day: string;
    times: string[];
};


export default function CalendarBlocks({ daysOfTheWeek, onDayClick, offDayClick }: CalendarBlocksProps){

    //Handle effecet for the button elements mapped onto every day. When Clicked they will render a function inside DayView.tsx, providing the props for that to be rendered
    const handleClick = (day: DayTypeObject) => (event: React.MouseEvent<HTMLButtonElement>) => {
        onDayClick(day); // Pass the day object to onDayClick
    };



    return(
        <div className={styles.calendarContainer}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        {daysOfTheWeek.map((day) =>
                        <th key={day.id} className={styles.th}>{day.day}</th>
                        )}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                <tr className={styles.tr2}>
                    {daysOfTheWeek.map((day) =>
                    <td key={day.id}
                    className={styles.td}>{day.times.join('\n ')}
                    <button onClick={handleClick(day)} className={styles.tdbutton}>Edit {day.day}</button>
                    </td>
                    )}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
