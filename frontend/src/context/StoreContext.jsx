import axios from "axios";
import { useEffect, useState } from "react";

import { createContext } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([])
    const [token , setToken ] = useState('')
    const addToCart = async(itemId)=>{
            if(!cartItems[itemId]){
                setCartItems((prev)=>({...prev,[itemId]:1}))
            } else{
                setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }
            if (token) {
                try {
                    const response = await axios.post(`${url}/api/cart/add`, { itemId, userId: userData._id }, { headers: { token } });
            
                    if (response.data.success) {
                        // Update local state or do any necessary UI updates
                        // Example assuming you have a function setCartItems to update local state
                        if(!cartItems[itemId]){
                            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
                        } else {
                            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                        }
                        // toast.success('Item added to cart');
                    } else {
                        // toast.error('Failed to add item to cart');
                    }
                } catch (error) {
                    console.error(error);
                    // toast.error(error.response ? error.response.data.message : error.message);
                }
            } else {
                // toast.error('User is not authenticated');
            }
            
    }

   

    const removeFromCart = async(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        // if(!token){
        //     await axios.post(url, "/api/cart/remove", {itemId}, {headers: {token}});
        // }
    }
    


    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item ]>0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data)
    }
    
    useEffect(()=>{
        async function loadData (){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

   

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;