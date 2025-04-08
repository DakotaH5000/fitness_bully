'use client';

import Image from "next/image";
import styles from "./page.module.css";
import RegisterForm from "@/features/auth/register_form";
import Link from "next/link";
import { paths } from "@/config/paths";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import isDBUser from "./api/db/Users/UserHelpers";



export default function Home() {

  const { data: session } = useSession();
  console.log(session?.user.email)
  const [isDBRegistered, setIsDBRegistered] = useState<Boolean|null|undefined>(null);

  useEffect(() => {
    if (session?.user?.email) {
      const checkDBRegistration = async () => {
        const result = await isDBUser(session.user.email);
        setIsDBRegistered(result);
      };
      checkDBRegistration();
    }
  }, [session?.user?.email]);

  
  if(session && isDBRegistered){
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div>
      <h1>Hello, {session?.user.name}</h1>
    </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
  }

  if(session && !isDBRegistered){
    return(
      <div className={styles.page}>
      <main className={styles.main}>
      <div>
      <h1>Fitness Bully needs some quick info, {session.user.name}!</h1>
      <Link href='/app/preferences'>Click Here</Link>
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
      <h1>Please login for motivation!</h1>
    </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
