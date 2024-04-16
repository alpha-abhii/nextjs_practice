"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast  from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignIn = () => {
    const router = useRouter()
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);

    const onSignIn = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user)
            console.log("Signup Success",response.data);
            router.push('/profile')

        } catch (error:any) {
            console.log("SignIn failed");
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading?"Processing": "Login"}</h1>
        <hr />
        <label htmlFor="email">Email</label>
        <input
        id='email'
        type='email'
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder='email'
        className='text-black'
        />
        <label htmlFor="password">Password</label>
        <input
        id='password'
        type='password'
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder='password'
        className='text-black'
        />

        <button onClick={onSignIn} className='p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
            {buttonDisabled?"No Login": "Login"}
        </button>
        <Link href="/signup">Visit signup page</Link>
    </div>
  )
}

export default SignIn