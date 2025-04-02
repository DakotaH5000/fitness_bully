'use client';

import LoginNav from "@/features/navigation/login_nav";
import styles from "./page.module.css"

export default function NavBar(){
    return(
        <div className={styles.container}>
            <div className={styles.children}>
            <LoginNav />
            </div>
        </div>
    );
}