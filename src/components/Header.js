import React from 'react'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='bg-blue-200'>
            <Logo className="" />
            <nav id='sidebar'>
                <div className='flex flex-row justify-between'>
                    <div className='flex-1 text-center'>
                        <NavLink to={"/"}>
                            <p>Call Logs</p>
                        </NavLink>
                    </div>
                    <div className='flex-1 text-center'>
                        <NavLink to={"/archieves"}>
                            <p>Archieves</p>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header