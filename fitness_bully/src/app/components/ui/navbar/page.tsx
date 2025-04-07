'use client';

import LoginNav from "@/features/navigation/login_nav";
import ToCalendar from "@/features/navigation/to_calendar";
import styles from "./page.module.css"
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar(){

    const { user, error, isLoading } = useUser();

    if(user){
        return(
            <div className={styles.container}>
            <div className={styles.children}>
            <LoginNav />
            <ToCalendar />
            </div>
        </div>
        );
    }

    return(
        <div className={styles.container}>
            <div className={styles.children}>
            <LoginNav />
            </div>
        </div>
    );
}