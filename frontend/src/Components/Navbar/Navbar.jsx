import React, {useState} from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'


export const Navbar = () => {

    const [menu, setMenu] = useState("shop");

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='' />
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                {/* For the onClick function, it's setting menu to whatever we click.
                With the menu==='shop' expression, we are saying that if the menu is equal to shop, include the hr tag
                which shows up as a red underline in our project. Applying this to all of our list items allows us to 
                dynamically show which li we're on/which category we're in */}
                <li onClick={() => {setMenu("shop")}}>Shop{menu==="shop" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("mens")}}>Men{menu==="mens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("womens")}}>Women{menu==="womens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("kids")}}>Kids{menu==="kids" ? <hr/> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <button>Login</button>
                <img src={cart_icon} alt='' />
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}

// could also remove the export at the top and have "export default Navbar" at the bottom