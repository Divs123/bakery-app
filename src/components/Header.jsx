import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import shoppingCart from "../images/shopping-cart.png";

export const Header = ({countOfCartItems}) => {
  const navigate = useNavigate();
  return (
	<>
		<ul className='navbar-list'>
				<li>
					<NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>CAKES</NavLink>
				</li>
				<li>
					<NavLink to='/classes' className={({ isActive }) => (isActive ? 'active' : '')}>CLASSES</NavLink>
				</li>
				<li>
					<NavLink to='/recipes' className={({ isActive }) => (isActive ? 'active' : '')}>RECIPES</NavLink>
				</li>
          
				<div className='cart' onClick={() => navigate('/cart')}>
					<div>
						<img src={shoppingCart} alt='cart'/>
					</div>
					<div className='badge'>{countOfCartItems || null}</div>
				</div>
		</ul>
	</>
  )
}

