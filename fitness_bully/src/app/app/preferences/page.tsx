'use client';

import UserPreferencesForm from "@/features/userPref/userPrefForm";
import styles from './page.module.css'



export default function userPreferences(){

    return(
    <div className={styles.container}>
        <div className={styles.children}>
            <UserPreferencesForm />
        </div>
    </div>
    );
}