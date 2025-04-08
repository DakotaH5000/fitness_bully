'use client';

import Link from "next/link";
import { paths } from "@/config/paths";
import { useSession, signIn, signOut } from "next-auth/react"



export default function LoginNav(){

    
    return(
        <div>
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
}