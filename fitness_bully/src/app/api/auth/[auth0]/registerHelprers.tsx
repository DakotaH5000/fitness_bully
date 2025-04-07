'use server';
import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';
import UserParams from '@/types/user';
import { assert } from 'console';


const db = await createConnection();


export default async function uniqueEmail(emailParam: string) {
        //Rows will return rows, fields will return structure of the database, we don't need fields currently but explicity returned
        const [rows, fields] = await db.query('SELECT * FROM Users WHERE email = ?',[emailParam])
        //If something is returned, is an array, and contains a value, check if the value is the same as our email which it should be if returned. 
        //IF the email given and email returned match, which They should.
        if (Array.isArray(rows) && rows.length > 0){
            const user = rows[0] as UserParams;
            if(user.email === emailParam){
           return true;
            }
        }
        //Else return false
        else return false;
}