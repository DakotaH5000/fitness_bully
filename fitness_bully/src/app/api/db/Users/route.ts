// app/api/db/route.ts
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';
import { scrubPhoneNumber } from '../Phone/PhoneUtils';
import { getUserID } from './UserHelpers';

export async function GET(req: Request) {
  try {
    const db = await createConnection();

    
    if (!db) {
      console.error('DB is undefined!');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    //Baseline query
    let query = 'SELECT * FROM Users';
    //TODO to rework and add all search params
    //Add search Params to Select * to get user if exsists meeting condition.
    const url = new URL(req.url)
    const email = url.searchParams.get('email')
    let quereyParams = [];
    if (email){
      query += ' WHERE EMAIL = ?'
      quereyParams.push(email);
    }

    const [Users] = await db.query(query, quereyParams)
    //Code returns an array of returned users.
    return NextResponse.json(Users);

  } catch (error: any) {
    console.error('DB error:', error);

    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}


export async function POST(req: Request){
  const body = await req.json();
  let params = []
  //rebulild the item after verifying and scrubbing

  //TODO if phonenumber status === 400 STOP exeuection, return user error and display on screen
  const phoneNumber = await scrubPhoneNumber(body.phone_number)
  if(phoneNumber.status !== 200){
    return NextResponse.json({message: phoneNumber.result, status: phoneNumber.status})
  }
  const isUniqueEmail = await getUserID(body.email)
  if(isUniqueEmail?.exists){
    return NextResponse.json({ messsage:"User already exists with this email" }, { status: 400 });
  }

  params.push(body.family_name)
  params.push(body.email)
  params.push(phoneNumber.result)
  params.push(body.given_name)
  params.push(body.carrier)

  try {
    const db = await createConnection();
    
    if (!db) {
      console.error('DB is undefined!');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    let query = 'INSERT INTO Users (family_name, email, phone_number, given_name, carrier)\
    VALUES(?,?,?,?,?)'

    const dbMessage = await db.query(query, params)
    return NextResponse.json(dbMessage);
  }
  catch (error: any) {
    console.error('DB error:', error);

    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
  return NextResponse.json({status: 200});
}



