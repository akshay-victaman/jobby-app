import {Link} from 'react-router-dom'
import { useState } from 'react';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import './style.css'

const NavBar = ({isLoggedIn}) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <>
            <nav className="navbar">
                <Link to='/'>
                    <img src="/victaman-logo.png" alt="website logo" className='nav-logo'/>
                </Link>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/jobs' className='nav-link'>Jobs</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={isLoggedIn ? '/' : '/signup'} className='nav-link'>
                            <button type='button' className='signup-button'>{isLoggedIn ? 'Logout' : 'Apply for hiring partner'}</button>
                        </Link>
                    </li>
                </ul>
                <button type='button' className='hamburger-menu'>
                    {
                        menuOpen ? 
                        <RxCross1 className='menu-icon' onClick={handleMenuClick} /> 
                        : 
                        <RxHamburgerMenu className='menu-icon' onClick={handleMenuClick} />
                    }
                </button>
            </nav>
            {
                menuOpen && 
                <div className='nav-overlay'>
                    <ul className='nav-list-mobile'>
                        <li className='nav-item-mobile'>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item-mobile'>
                            <Link to='/jobs' className='nav-link'>Jobs</Link>
                        </li>
                        <li className='nav-item-mobile'>
                            <Link to={isLoggedIn ? '/' : '/signup'} className='nav-link'>
                                <button type='button' className='signup-button'>{isLoggedIn ? 'Logout' : 'Apply for hiring partner'}</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default NavBar;