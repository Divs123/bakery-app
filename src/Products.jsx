import React, { useEffect, useState } from 'react'
import './Products.css'

export default function Products({apiUrl, isCakesTab=false, onAdd, cartItems=[], onRemove}) {
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch(`${apiUrl}.json`).then(res => res.json()).then(result => {
			setList(result);
		});
	}, [apiUrl])
  return (
	<div className='productsList'>
		{
			list.map(ele => {
			const newItem = cartItems.find(item => item.id === ele.id)
				return(
					<div key={ele.id} >
						<img className='productImg' src={ele.image}  alt={ele.name}/>
						<div className='productDetails'>
							<div className='productName'>{ele.name}</div>
							{/* <div>Rs. {ele.price}</div> */}
							<div>{isCakesTab ? 'Rs.': null} {ele.price}</div>
						</div>
						{ isCakesTab ? 
							(newItem ?
							<div className='counter'>
								<button className='decreaseItem' onClick={() => onRemove(newItem)} > - </button> 
								<span>{newItem.qty}</span>
								<button className='increaseItem' onClick={() => onAdd(newItem)} > + </button> 
							</div>  :
							<button className='addtoCart' onClick={() => onAdd(ele)}>Add to Cart</button>) : null
						}
						
					</div>
				)
			})
		}
	</div>
  )
}
