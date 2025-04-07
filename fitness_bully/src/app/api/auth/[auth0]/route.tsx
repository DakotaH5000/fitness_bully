import { handleAuth } from '@auth0/nextjs-auth0';
import mysql from 'mysql2/promise';
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';
import UserParams from '@/types/user';
import uniqueEmail from './registerHelprers';

let connection: mysql.Connection;



export const GET = handleAuth();


export async function POST(req: Request){
  try{
    const body = await req.json();
    const userData: UserParams =  body;

    const db = await createConnection();
  
    const accountRegisteredAlready  = await uniqueEmail(userData.email);
    if(accountRegisteredAlready){
      throw new Error("Account exsists with email already")
    }

    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    db.execute("INSERT INTO Users (carrier, email, given_name, family_name, password, phone_number) Values(?,?,?,?,?,?)",
      [
        userData.carrier,
        userData.email,
        userData.given_name,
        userData.family_name,
        userData.password,
        userData.phone_number
      ]);

      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  }
  catch (error: any) {
    console.error('DB error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
}
}