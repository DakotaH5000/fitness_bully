import { scrubPhoneNumber } from "@/app/api/db/Phone/PhoneUtils"
import { isDBUser } from "@/app/api/db/Users/UserHelpers";



describe('scrubPhoneNumber', () =>{
    it('returns clean number if valid',async  () =>{
        const result = await scrubPhoneNumber('123-456-7890');
        expect(result).toEqual({result: "1234567890", isValid: true, status:200});
    })

    it('returns invalid for too short', async () =>{
        const result = await scrubPhoneNumber('1234');
        expect(result.isValid).toBe(false);
        expect(result.status).toEqual(304);
    })
}),

describe('isDBUser', () =>{
    it('Finds a user who exsists', async () =>{
        const result = await isDBUser("dakotah5000@gmail.com")
        expect(result).toEqual(true);
    })
    it('Works with trailing white space', async () =>{
        const result = await isDBUser("dakotah5000@gmail.com   ")
        expect(result).toEqual(true);
    })
    it('Works with varying capitalization', async () =>{
        const result = await isDBUser("DakOtaH5000@gmail.com")
        expect(result).toEqual(true);
    })
    it('Works with leading white space', async () =>{
        const result = await isDBUser("   DakOtaH5000@gmail.com")
        expect(result).toEqual(true);
    })
    it('Email does not exsist', async () =>{
        const result = await isDBUser('Fake@aol.com')
        expect(result).toEqual(false||null); 
    })
})
