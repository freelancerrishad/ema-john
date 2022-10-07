import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    let shipping =0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity+product.quantity;
        total = total+(product.price*quantity);
        shipping = shipping + (product.shipping*quantity);
    }
    const taxString = (total*.10).toFixed(2);
    const tax = parseFloat(taxString);
    const grandTotal = total+shipping+tax;
    return (
        <div className='cart'>
             <h4>Order Summary</h4>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping: ${shipping}</p>
                <p>Tax: ${tax}</p>
                <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;