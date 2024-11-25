import React from 'react'

const NavBar = () => {
  return (
    <div>
      <nav className='flex h-16 items-center justify-center font-bold text-xl  w-1/2 mx-auto text-white'>
      <div className=' py-2 bg-green-800 border-4 border-green-900 shadow-2xl rounded-full cursor-pointer px-2 text-center '>
        <span className='text-green-500'>&lt;</span><span>Safe</span><span className='text-yellow-400'>Pass</span><span className='text-green-500'>/&gt;</span>
      </div>
      </nav>
    </div>
  )
}

export default NavBar
