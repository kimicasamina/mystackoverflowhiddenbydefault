import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../actions/user'

function ProtectedRoute() {
  const user = useSelector(state => state.user?.userInfo)
  const dispatch = useDispatch()
  console.log("PROTECTED ROUTE:", user)

  // useEffect(() => {
  //   if(!user){
  //     dispatch(getUser())
  //   }
  // }, [])

  if(!user){
    return <Navigate to='/login' />
  }
  
  return <Outlet />

}

export default ProtectedRoute