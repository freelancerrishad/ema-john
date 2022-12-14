import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, getStoredCart} from '../../utilities/fakedb'


const Shop = () => {
    const [products,setProducts] = useState([]);
   const [cart, setCart] = useState([])
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data));
    },[])

    useEffect(()=>{
        const stroredCart = getStoredCart();
        const savedCart = [];
        for(const id in stroredCart){
            const addedProduct = products.find(product => product.id===id)
            if(addedProduct){
                const quantity = stroredCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    },[products])
    const handleAddToCart = (product)=>{
        let newCart = [];
        const exists = cart.find(pro =>pro.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart,product];
        }
        else{
            const rest = cart.filter(pro => pro.id!=product.id);
            exists.quantity = exists.quantity+1;
            newCart = [...rest,exists];
        }
        // const newCart = [...cart, product];

        setCart(newCart)
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product
                    key={product.id}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                    >

                    </Product>
                    )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;