import UserParams from "@/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './userPrefForm.module.css'
import { useSession } from "next-auth/react";



export default function UserPreferencesForm(){

  const { data: session } = useSession();

  const fields = [
    {id:0, name:"email", label:"Email"},
    {id:1, name:"given_name", label:"First Name"},
    {id:2, name:"family_name", label:"Last Name" },
    {id:3, name:"phone_number", label:"Phone Number"}
]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserParams>()
  const onSubmit: SubmitHandler<UserParams> = async (userInfo) => {
    const res = await fetch('/api/db/Users',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
  } 


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      
      {/* register your input into the hook by invoking the "register" function */}

      {fields.map((field) => 
      <div key={field?.name}
      className={styles.userInputLine}>
      <label className={styles.userInputLabel}>{field?.label}</label>
      <input className={styles.inputItem} {...register(field?.name as keyof UserParams , {required: true})}  defaultValue={session?.user[field!.name]} maxLength={32}  />
      {errors[field?.name as keyof UserParams] && <span className={styles.spanText}>This field is required</span>}
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