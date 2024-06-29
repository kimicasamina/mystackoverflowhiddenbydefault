import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(form)
      try {
        const data = await axios.post('/user/signup', form)

        // navigate to login page
        return <Navigate to="/login" />
      } catch(err) {
        console.log(err)
        toast.error(err.message)
      }
    }

  return (
    <>
         <form action="" className='section-layout max-w-screen-sm mx-auto flex flex-col gap-y-4 mt-12 sm:mt-24' onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-4xl text-center text-dark mb-4">SIGNUP ACCOUNT</h2>
            <div className="flex flex-col ">
                <label htmlFor="username" className="">Username</label>
                <input 
                type="text"
                name="username" 
                value={form.username}
                className="border border-black rounded-md p-2 text-black" placeholder='Username'
                onChange={(e) => setForm({...form, username: e.target.value})}
                />
            </div>
            <div className="flex flex-col ">
                <label htmlFor="email" className="">Email</label>
                <input 
                type="email"
                name="email" 
                value={form.email}
                className="border border-black rounded-md p-2 text-black" placeholder='Email'
                onChange={(e) => setForm({...form, email: e.target.value})}
                />
            </div>
            <div className="flex flex-col ">
                <label htmlFor="password" className="">Password</label>
                <input 
                type="password" 
                name="password" 
                value={form.password}
                className="border border-black rounded-md p-2 text-black" placeholder='Password'
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
            </div>
            <span className="">Already have an Account?
                <Link to="/login" className='text-primary font-semibold'>{" "}Login</Link>
            </span>
            <button type="submit" className='btn btn--dark mx-auto mt-4'>SUBMIT</button>
        </form>
    </>
  )
}

export default Signup