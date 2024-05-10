import React from 'react'
import './Item.css'


// used (props) because it's going to be multiple, so we use props.attribute to call the attribute
export const Item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt='' />
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}
