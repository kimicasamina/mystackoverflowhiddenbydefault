import React from 'react'
import Note from '../components/Note'

const Search = ({ query }) => {
  return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {
            query.map(note => {
              return(
                <Note key={note._id} note={note} />
              )
            })
          }
        </div>
    
  )
}

export default Search