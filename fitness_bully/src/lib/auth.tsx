import { z } from 'zod';

export const loginInputSchema = z.object({
    email: z.string().min(4,'Required').email(),
    password: z.string().min(8, 'Required')
});

export const registerInputSchema = z.object({
    //Email, password, First Name, Lastname, Phone#, Carrier, ID
    email: z.string().min(4,'Required').email(),
    password: z.string().min(8, 'Required'),
    firstName: z.string().min(0, 'Required'),
    lastName: z.string().min(0, 'Required'),
    phoneNumber: z.number().min(10, 'Required'),
    //This is an enumerable type and stored as a number
    Carrier: z.number().min(1,'Required')
    
});


