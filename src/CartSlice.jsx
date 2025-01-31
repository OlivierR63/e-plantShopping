import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },

    reducers: {
        addItem: (state, action) => {
            const {name, image, cost} = action.payload;
            const existingItem = state.items.find(item => item.name == name);

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
            const existingItem = state.items.find(item => item.name === name);

            if(existingItem && existingItem.quantity > 0){
                existingItem.quantity --;
            }

            if (existingItem && existingItem.quantity == 0){
                const itemIndex = state.items.indexOf(existingItem);
                if (itemIndex != -1){
                    state.items=state.items.splice(itemIndex, 1);
                }
            }
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            
            if (itemToUpdate){
                if( quantity > 0){
                    itemToUpdate.quantity = quantity;
                }

                if (quantity == 0){
                    const itemIndex = state.items.indexOf(itemToUpdate);
                    if (itemIndex != -1){
                        state.items=state.items.splice(itemIndex, 1);
                    }
                }
            }   
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
