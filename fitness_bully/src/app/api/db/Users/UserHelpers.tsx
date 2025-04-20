import { NextResponse } from "next/server";
import { nan } from "zod";


export async function isDBUser(email: string){
    email = email.toLowerCase().trim();
    //TODO turn this to an env variable
    const BaseURL = 'http://localhost:3000/api/db/Users';
    const url = `${BaseURL}?email=${encodeURIComponent(email)}`
    console.log(`url is ${url}`)

    try {
        const response = await fetch(url);
        console.log("response: " + response)
        const data = await response.json()
        console.log("Data:")
        console.log(data);

        if(data[0].email){
            return true}
        return false;
        if (!response.ok) {
          throw new Error('Network response was not ok');
                }
        }
    catch{
        return null;
        }
    
}

export async function getUserID(email:string){

    email = email.toLowerCase().trim();
    //TODO turn this to an env variable
    const BaseURL = 'http://localhost:3000/api/db/Users';
    if(email){
        const url = `${BaseURL}?email=${encodeURIComponent(email)}`
         console.log(`url is ${url}`)
     try {
         const response = await fetch(url);
         const data = await response.json()
 
         if(data[0].user_id.type()){
            const user_id = data[0].user_id
            return {User:user_id, exists:true};}
         return {User:null, exists:false};
         if (!response.ok) {
           throw new Error('Network response was not ok');
                 }
         }
     catch{
         return null;
         }
     }


};


