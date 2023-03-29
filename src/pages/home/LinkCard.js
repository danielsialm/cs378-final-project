import React from 'react'
import { useNavigate } from 'react-router'

function LinkCard({Icon, text, pr, link}) {
  const navigate = useNavigate();

  return (
    <div className={`md:w-1/4 w-1/2 pb-2 ${pr ? "pr-2" : ""}`} onClick={() => {navigate(link)}}>
        <div className=' border-2 border-gray-200 flex flex-row items-center md:p-4 p-2 rounded-lg'>
            <Icon className = 'w-10 h-10 mr-4'/>
            <div className='text-xl font-bold text-gray-800'>{text}</div>
        </div>
    </div>
  )
}

export default LinkCard