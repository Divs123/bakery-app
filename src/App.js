import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import Products from './Products';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []);
  }, []);

  const onAdd = product => {
      const item = cartItems.find(item => item.id === product.id);
      if(item){
       const newCartItems = cartItems.map(ele => ele.id === item.id ? {...item, qty: item.qty + 1} : ele);
       setCartItems(newCartItems);
       localStorage.setItem('cartItem', JSON.stringify(newCartItems));
      } else {
        const newCartItems = [...cartItems, {...product, qty: 1}];
        setCartItems(newCartItems);
        localStorage.setItem('cartItem', JSON.stringify(newCartItems));
      }
  }

  const onRemove = product => {
    const item = cartItems.find(item => item.id === product.id);
    if(item.qty === 1){
      const newCartItems = cartItems.filter(ele => ele.id !== product.id) || [];
      setCartItems(newCartItems);
      localStorage.setItem('cartItem', JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map(ele => ele.id === product.id ? {...item, qty: item.qty - 1} : ele );
      setCartItems(newCartItems);
      localStorage.setItem('cartItem', JSON.stringify(newCartItems));
    }
  }

  const deleteItem = item => {
    const newCartItems = cartItems.filter(ele => ele.id !== item.id) || [];
    setCartItems(newCartItems);
    localStorage.setItem('cartItem', JSON.stringify(newCartItems));
  }

  return (
    <div className="App">
      <Router>
        <Header countOfCartItems={cartItems.length}/>
        <Routes>
          <Route exact path="/" element={<Products cartItems={cartItems} apiUrl='cakesMockData' isCakesTab={true} onAdd={onAdd} onRemove={onRemove}/>} />
          <Route exact path="classes" element={<Products apiUrl='classesMockData' />} />
          <Route exact path="recipes" element={<Products apiUrl='recipesMockData'/>} />
          <Route exact path="cart" element={<Cart  cartItems={cartItems} deleteItemFromCart={deleteItem} onAdd={onAdd} onRemove={onRemove}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
