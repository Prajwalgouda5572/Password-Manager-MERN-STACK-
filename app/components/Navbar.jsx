import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-800 h-13'>
      <ul className='flex justify-around items-center pt-2 text-white'>
        <li className='text-xl font-semibold mr-70'>Password-Manager</li>
        <div className='bg-green-500 w-18 flex justify-center items-center h-8 rounded-2xl ring-2'>
          <a href="https://github.com/" target='_blank'><span className='font-bold'>GitHub</span></a>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
