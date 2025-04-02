'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { EnumLike, input } from "zod";

type Inputs = {
//Email, password, First Name, Lastname, Phone#, Carrier, ID
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: BigInteger;
  carrier: string;
}

const fields = [
    {id:0, name:"username", label:"Username"},
    {id:1, name:"password", label:"Password"},
    {id:2, name:"firstName", label:"First Name"},
    {id:3, name:"lastName", label:"Last Name"},
    {id:4, name:"phoneNumber", label:"Phone Number"}
]


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  console.log(watch("carrier")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

      {fields.map((fields) => 
      <div>
      <label>{fields.label}</label>
      <input {...register(fields.name as keyof Inputs , {required: true})} />
      {errors[fields.name as keyof Inputs] && <span>This field is required</span>}
      </div>
        )}

    <label>Carrier</label>
    <select {...register("carrier", { required: true })}>
        <option value="Verizon">Verizon</option>
        <option value="AT&T">AT&T</option>
        <option value="T-Mobile">T-Mobile</option>
        <option value="Sprint">Sprint</option>
        <option value="Boost">Boost</option>
        <option value="Cricket">Cricket</option>
    </select>
    {errors.carrier && <span>This field is required</span>}
    
      <input type="submit" />
    </form>
  )
}