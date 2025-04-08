

export default async function isDBUser(email: string){
    const BaseURL = 'http://localhost:3000/api/db/Users';
    console.log("running is db user")
    console.log(email)
    if(email){
       const url = `${BaseURL}?email=${encodeURIComponent(email)}`
        console.log(`url is ${url}`)
    try {
        const response = await fetch(url);
        const data = await response.json()


        if(data[0].email.type()){
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
}

export async function getUserID(email:string){

    const BaseURL = 'http://localhost:3000/api/db/Users';
    if(email){
        const url = `${BaseURL}?email=${encodeURIComponent(email)}`
         console.log(`url is ${url}`)
     try {
         const response = await fetch(url);
         const data = await response.json()
 
 
         if(data[0].user_id.type()){
            const user_id = data[0].user_id
            return user_id;}
         return 'User not found';
         if (!response.ok) {
           throw new Error('Network response was not ok');
                 }
         }
     catch{
         return null;
         }
     }


};