'use client';

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
}


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  console.log(watch("email")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label>Email</label>
      <input defaultValue="test" {...register("email", {required: true})} />
      {errors.email&& <span>Enter an email address</span>}


      {/* include validation with required or other standard HTML validation rules */}
      <label>Password</label>
      <input {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}


      <input type="submit" />
    </form>
  )
}