// app/api/db/route.ts
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

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




