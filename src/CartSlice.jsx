import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },

    reducers: {
        addItem: (state, action) => {
            const {name, image, cost} = action.payload;

            if (!name || !image || cost === undefined) {
                console.error("Invalid input: name, image, and cost are required.");
                return;
            }
                
            const existingItem = state.items.find(item => item.name === name);

            // Remark : The existingItem variable points to the same object as the element found in state.items.
            //         It does not create a copy of the object, but simply a reference to that object.
            
            if(existingItem){
                existingItem.quantity ++;
            }
            else{
                state.items.push({name, image, cost, quantity:1});
            }
        },

        removeItem: (state, action) => {
            const {name} = action.payload;
            const itemExists = state.items.some(item => item.name === name);
            if (!itemExists) {
                console.warn(`Item "${name}" not found in cart.`);
            } else {
                state.items = state.items.filter(item => item.name !== name);
            }
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            
            if (itemToUpdate){
                if( quantity >= 0){
                    itemToUpdate.quantity = quantity;
                }
                else{
                    console.error("Input error: quantity must be positive.")
                }
            }   
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
