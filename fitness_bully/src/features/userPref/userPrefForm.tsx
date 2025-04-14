import UserParams from "@/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './userPrefForm.module.css'
/* 
type UserParams = {
    given_name: string;
    email: string,
    phone_number: number,
    email_verified: boolean,
    phone_verified: boolean,
    family_name: string,
    user_id: string,
    password: string,
    carrier: string
  }
    */








export default function UserPreferencesForm(){

  const fields = [
    {id:0, name:"email", label:"Email"},
    {id:1, name:"password", label:"Password"},
    {id:2, name:"given_name", label:"First Name"},
    {id:3, name:"family_name", label:"Last Name"},
    {id:4, name:"phone_number", label:"Phone Number"}
]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserParams>()
  const onSubmit: SubmitHandler<UserParams> = async (data) => {
    const res = await fetch('/api/db/userPreferences',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } 


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      
      {/* register your input into the hook by invoking the "register" function */}

      {fields.map((field) => 
      <div key={field.name}
      className={styles.userInputLine}>
      <label className={styles.userInputLabel}>{field.label}</label>
      <input className={styles.inputItem} {...register(field.name as keyof UserParams , {required: true})} />
      {errors[field.name as keyof UserParams] && <span className={styles.spanText}>This field is required</span>}
      </div>
        )}

    {/*Value will be written to the data base as a string. User can't modify out side of dropdowns so should work similar to an ENUM, should not need to be decalred as one.*/}
    <div className={styles.userInputLine}>
    <label className={styles.userInputLabel}>Carrier</label>
    <select className={styles.select} {...register("carrier", { required: true })}>
        <option value="Verizon">Verizon</option>
        <option value="AT&T">AT&T</option>
        <option value="T-Mobile">T-Mobile</option>
        <option value="Sprint">Sprint</option>
        <option value="Boost">Boost</option>
        <option value="Cricket">Cricket</option>
    </select>
    </div>
    {errors.carrier && <span>This field is required</span>}
    
      <input type="submit" className={styles.submit}/>
    </form>
  )


}