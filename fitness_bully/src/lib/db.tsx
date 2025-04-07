import mysql from 'mysql2/promise';

let connection: mysql.Connection;

export const createConnection = async () =>{
    if(!connection){
        try{
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        }

    )}
    catch(error){console.log(error)}
    }

    return connection;
}