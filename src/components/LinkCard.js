import React from 'react'
import { useNavigate } from 'react-router'

function LinkCard({Icon, text, pr, link}) {
  const navigate = useNavigate();

  return (
    <div className={`md:w-1/4 w-1/4 pb-2 ${pr ? "pr-2" : ""}`} onClick={() => {navigate(link)}}>
        <div className='flex flex-col items-center md:p-4 p-2 rounded-lg justify-between bg-white'>
            <Icon className = 'w-8 h-8 mb-1'/>
            <div className='text-sm font-bold text-gray-800'>{text}</div>
        </div>
    </div>
  )
}

export default LinkCard;