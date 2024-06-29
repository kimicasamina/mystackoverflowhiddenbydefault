import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Note from '../components/Note'
import { getNotes } from '../actions/notes'
import Search from './Search'

const Profile = () => {
  const user = useSelector(state => state.user.userInfo)
  const { keyword } = useSelector(state => state.ui)
  const notes = useSelector(state => state.notes)
  console.log("NOTES:", notes)
  const dispatch = useDispatch()
  console.log("Keyword:", keyword)

  useEffect(() => {
    dispatch(getNotes(user.username))
  }, [])
  
  if(keyword){
    const query = notes.filter(note => {
      if(keyword){
        if(note.title.toLowerCase().includes(keyword.toLowerCase()) || note.tags.toLowerCase().includes(keyword.toLowerCase())){
          return note
        }
      }
    })
    return <Search query={query}/>
  }

  return (
    <>
      {
        notes && notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {
              notes.map(note => {
                return(
                  <Note key={note._id} note={note} />
                )
              })
            }
          </div>
        ) : (
          <h1 className="text-3xl text-dark">EMPTY...</h1>
        )
      }
    </>
  )
}

export default Profile