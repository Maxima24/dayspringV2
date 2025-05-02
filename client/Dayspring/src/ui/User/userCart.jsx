import React from 'react'
// import store from '../../store'
import { clearCart, deleteFromCart } from '../../feautures/cartSlice'
import { useDispatch,useSelector } from 'react-redux'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

function UserCart() {
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const user = useSelector(state=>state.user)
    const {username,role} = user
    const cartItems = useSelector(state=>state.cart.cart)
    console.log(cartItems)
   
    function removeFromCart(id){
       dispatch(deleteFromCart(id))
       console.log(id)
    }
   
  return (
    <div className="p-6 space-y-8 text-blue-300 bg-gradient-to-br from-slate-950 to-slate-800 min-h-screen">
  <section className="text-2xl font-semibold border-b border-stone-200 pb-4 flex justify-between">
  <div className='flex gap-2'>
  <div >
        <Button onClick={()=> navigate(`/home/${role}/${username}`)
        } type={"secondary"}>🔙</Button>
      </div>
  <h1>Your Cart 🛒</h1>
  </div>
  <div >
        <Button onClick={()=>{
            dispatch(clearCart())
        }} type={"secondary"}>Clear Cart</Button>
      </div>
   
  </section>

  {cartItems.length === 0 ? (
    <p className="text-gray-400">Your cart is empty.</p>
  ) : (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center bg-white text-black rounded-lg shadow p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-full md:w-32 object-cover rounded mb-4 md:mb-0"
            />
            <div className="flex-1 md:ml-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.price}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                //   onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                //   onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <button
                onClick={()=>removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white text-black rounded-lg shadow p-4 space-y-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          {/* <span>${totalPrice.toFixed(2)}</span> */}
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          {/* <span>${totalPrice.toFixed(2)}</span> */}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</div>

  )
}

export default UserCart