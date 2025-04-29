import React from 'react'
import NavLayout from './Navigation/navLayout'
import {Outlet} from "react-router-dom"

function AppLayout() {
  return (
    <div>
        <NavLayout/>
        <main>
            <Outlet/>
        </main>
       
    </div>
  )
}

export default AppLayout