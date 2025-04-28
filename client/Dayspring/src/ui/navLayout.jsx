import React from 'react'

function NavLayout() {
  return (
    <div className='bg-blue-500 px-4 py-2'>
        <ul className='flex items-center justify-between'>
            <li>home</li>
            <div>
            <ul  className='flex items-center gap-4 mr-2'>
            <li>Sign-up</li>
            <li>Login</li>
            <li>Contact us</li>
            </ul>
            </div>
           
        </ul>
    </div>
  )
}

export default NavLayout