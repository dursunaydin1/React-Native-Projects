import {configureStore} from '@reduxjs/toolkit';

import ProductReducer from './slices/ProductsSlice';
import WishlistReducer from './slices/WishlistSlice';
import CartReducer from './slices/CartSlice';
import AddressReducer from './slices/AddressSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
  },
});
