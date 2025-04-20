import { NextResponse } from "next/server";

export async function scrubPhoneNumber(phoneNumber: string){
//TODO rewrite single pass, does not need if statements
    const scrubbedNumber = phoneNumber.split('').filter((number) => !isNaN(parseInt(number))).join('');

    if(scrubbedNumber.length === 10){
        return {result: scrubbedNumber, isValid: true, status:200}
    }

    else{
        return{result: 'Invalid length number or invalid number in side, please check input', isValid: false, status: 304}
    }
}