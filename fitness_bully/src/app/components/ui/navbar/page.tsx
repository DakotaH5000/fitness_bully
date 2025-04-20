'use client';

import LoginNav from "@/features/navigation/login_nav";
import ToCalendar from "@/features/navigation/to_calendar";
import styles from "./page.module.css"
import { useSession, signIn, signOut } from "next-auth/react";
import UserParams from "@/types/user"; 


export default function NavBar(){
    const { data: session } = useSession()
/*
    if(){
        return(
            <div className={styles.container}>
            <div className={styles.children}>
            <LoginNav />
            <ToCalendar />
            </div>
        </div>
        );
    }
    */
    if (session) {
        return (
            <div className={styles.container}>
            <div className={styles.children}>
            Signed in as {session?.user.name} <br />
            <button className={styles.signoutButton}onClick={() => signOut()}>Sign out</button>
            </div>
                </div>
        )
      }
    

    return(
        <div className={styles.container}>
            <div className={styles.children}>
            <LoginNav />
            <ToCalendar />
            </div>
        </div>
    );
}