import { createSlice } from "@reduxjs/toolkit";
const initialState ={
   
    cart:[
        {id:1,quantity:1,price:50,description:"your pq",totalPrice:200,image:""},
        {id:2,quantity:1,price:50,description:"your pq",totalPrice:200,image:""},
        {id:3,quantity:1,price:50,description:"your pq",totalPrice:200,image:""},
        {id:4,quantity:1,price:50,description:"your pq",totalPrice:200,image:""},
        {id:5,quantity:1,price:50,description:"your pq",totalPrice:200,image:""}
    ]

    }



const cartSlice = createSlice({
    name:"cart",initialState,reducers:{
        addToCart:(state,action)=>{
            state.cart.push(action.payload)
        },
        // removing from shop;
        deleteFromCart:(state,action)=>{
          state.cart=  state.cart.filter((item=>item.id !== action.payload))
        },
        clearCart:(state)=>{
            state.cart=[]
        }

    }
})
export const {addToCart,deleteFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer