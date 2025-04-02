'use client';

import Link from "next/link";
import { paths } from "@/config/paths";
import { useUser } from "@auth0/nextjs-auth0/client";


export default function LoginNav(){
    const { user, error, isLoading } = useUser();
    if(user){
        return(
            <div>
                <a href="/api/auth/logout">Logout</a>
        </div>
        );
    }
    return(
        <div>
            <a href="/api/auth/login">Login</a>
            <button onClick={() =>console.log(user)}>User info</button>
        </div>
    );
}