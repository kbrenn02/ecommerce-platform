import React, {useContext, useRef, useState} from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom' // Adding in Link from react-router-dom allows us to send the user
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown_icon.png'
// to different pages when they click


export const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='' />
                <p>SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                {/* For the onClick function, it's setting menu to whatever we click.
                With the menu==='shop' expression, we are saying that if the menu is equal to shop, include the hr tag
                which shows up as a red underline in our project. Applying this to all of our list items allows us to 
                dynamically show which li we're on/which category we're in */}
                <li onClick={() => {setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu==="shop" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("mens")}}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu==="mens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("womens")}}><Link style={{ textDecoration: 'none' }} to='womens'>Women</Link>{menu==="womens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu==="kids" ? <hr/> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt='' /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

// could also remove the export at the top and have "export default Navbar" at the bottom