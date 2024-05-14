import React from 'react'
import './Breadcrumb.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const Breadcrumb = (props) => {

    // Breadcrumb is basically just the path you click through on a website
    const {product} = props;

     return (
        <div className='breadcrumb'>
            HOME <img src={arrow_icon} alt="" /> 
            SHOP <img src={arrow_icon} alt="" /> 
            {product.category} <img src={arrow_icon} alt="" /> 
            {product.name}
        </div>
    )
}
