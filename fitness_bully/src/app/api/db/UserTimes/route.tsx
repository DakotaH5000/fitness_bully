// app/api/db/route.ts
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';
import UserParams from '@/types/user';

export async function GET(req: Request) {
    const body = await req.json();
    const userData: UserParams =  body;
  try {
    const db = await createConnection();

    
    if (!db) {
      console.error('DB is undefined!');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const [Users] = await db.query('SELECT * FROM UserTimes WHERE user_id = ?', [userData.user_id]);
    return NextResponse.json(Users);
  } catch (error: any) {
    console.error('DB error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}


export async function POST(req: Request){
  const body = await req.json();
  console.log(body);

  try {
    const db = await createConnection();
  }
  catch(error: any){
    console.error('DB error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}




