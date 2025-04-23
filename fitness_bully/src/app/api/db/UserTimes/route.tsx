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
  console.log(body)
  console.log("Decomposed Body")
  const day:string = body[0];
  const times: string[] = body[1];
  const UID: number|string = body[2];



//TODO create transaction to remove unlisted times
  try {

  //TODO single pass?    
    const db = await createConnection();
    for(const time of times){
      const params = [];


      params.push(UID);
      params.push(day)
      params.push(time)
      console.log(params)
    const query = 'INSERT INTO UserTimes(ID, DAY, TIMES)\
    VALUES(?,?,?)'
    

    const dbMessage = await db.query(query, params)
    }
    return NextResponse.json({status:200})
  }
  catch(error: any){
    console.error('DB error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}




