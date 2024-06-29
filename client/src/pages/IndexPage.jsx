import React, { useEffect, useState } from 'react'
import notebook from '../assets/notebook.svg'
import dev_productivity from '../assets/dev_productivity.svg'
import file_manager from '../assets/file_manager.svg'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../actions/user'

const IndexPage = () => {
  const user = useSelector(state => state.user?.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Component mount")
    if(!user){
      dispatch(getUser())
      console.log("fetching user data")
    }
  }, [])

  if(user){
    console.log("navigate to user profile")
    return <Navigate to={`/${user.username}`} />
  }

  return (
    <>
      <section className="flex flex-col md:flex-row py-10 sm:py-20">
        <div className="flex-1 md:mt-20 py-10 flex flex-col gap-y-6">
          <h1 className="text-4xl text-dark leading-relaxed">Lorem ipsum dolor sit amet{' '}
          <span className="text-4xl text-primary">Hello World</span>
          </h1>
          
          <p className="">Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing.</p>

          <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
            <button className="btn btn--dark">Login</button>
            <button className="btn btn--dark">Signup</button>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <img src={file_manager} alt="" className='w-full md:w-[400px] '/>
        </div>
      </section>

      <section className="">

      </section>
    </>


    
  )
}

export default IndexPage