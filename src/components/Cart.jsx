import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import deleteIcon from '../images/delete.png';

// import '/Users/divya.rani1/Documents/bakery-app/public';

export const Cart = ({cartItems, deleteItemFromCart, onRemove, onAdd}) => {
	const navigate = useNavigate();

	const getTotalPrice = () => {
		const sum = cartItems.reduce((acc, curr) => {
			return acc + (curr.qty*curr.price);
		}, 0);
		return sum;
	}

	const getCheckoutData = () => {
			console.log("total items in cart", cartItems);
	}

  return (
	<div className='cartContainer'>
		{cartItems.length === 0 ? 
	   		<div className='emptyCart'>
				<p>YOUR CART IS EMPTY</p>
				<button className='btnWrapper' onClick={() => navigate('/')}>Continue shopping</button>
			</div> : 
			<>
				{
					cartItems.map(item => {
					return <div className='cartInfo' key={item.id}>
							<div className='itemImgWrapper'>
								<img onClick={() => deleteItemFromCart(item)} className='deleteIcon' src={deleteIcon} alt='deleteIcon'/>
								<div className='mrBtm20'>
									<img className='cartIconImg' src={item.image}  alt={item.name}/>
									<div className='itemName'>{item.name}</div>
								</div>
								<div className='counter'>
									<button className='decreaseItem' onClick={() => onRemove(item)} > - </button> 
									<span>{item.qty}</span>
									<button className='increaseItem' onClick={() => onAdd(item)} > + </button> 
							    </div>
							 </div>
							 <div className='totalPrice'>
								<div className='total'>Total</div>
								<div>Rs. {item.price* item.qty}</div>
							 </div>
						   </div>
					})
				}
				<div className='subTotalWrapper'>
					<div></div>
					<div>
						<div className='subTotal' >
							<div className='label'>Subtotal:</div>
							<div className='price'>{`${`Rs. ${getTotalPrice()}`}`}</div>
						</div>
						<button className='btnWrapper' onClick={getCheckoutData}>Check Out</button>
					</div>
					
				</div>
			</>
	    }
	</div>
  )
}
