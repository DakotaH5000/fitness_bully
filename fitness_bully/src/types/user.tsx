type UserParams = {
    given_name: string;
    email: string,
    phone_number: number,
    email_verified: boolean,
    phone_verified: boolean,
    family_name: string,
    user_id: string,
    carrier: string
  }

  /*
  {
  "email": "user@example.com",
  "phone_number": "string",
  "user_metadata": {},
  "blocked": false,
  "email_verified": false,
  "phone_verified": false,
  "app_metadata": {},
  "given_name": "string",
  "family_name": "string",
  "name": "string",
  "nickname": "string",
  "picture": "string",
  "user_id": "string",
  "connection": "string",
  "password": "string",
  "verify_email": false,
  "username": "string"
} */

export default UserParams;