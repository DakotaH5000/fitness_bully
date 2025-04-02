'use client';

import Image from "next/image";
import styles from "./page.module.css";
import RegisterForm from "@/features/auth/register_form";
import Link from "next/link";
import { paths } from "@/config/paths";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading){
    return(
      <div>
        Loading
      </div>
    );
  }

  if(user){
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div>
      <h1>Hello {user.given_name}</h1>
    </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div>
      <h1>Logged Out</h1>
    </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
