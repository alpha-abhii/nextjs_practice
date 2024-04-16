"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast  from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signup = () => {
    const router = useRouter()
    const [user,setUser] = useState({
        email: "",
        username: "",
        password: ""
    })
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);

    const onSignup = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Success",response.data);
            router.push('/login')

        } catch (error:any) {
            console.log("SignUp failed");
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading?"Processing": "signup"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
        id='username'
        type='text'
        value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder='username'
        className='text-black'
        />
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

        <button onClick={onSignup} className='p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
            {buttonDisabled?"No signup": "Signup"}
        </button>
        <Link href="/login">Visit login page</Link>
    </div>
  )
}

export default Signup