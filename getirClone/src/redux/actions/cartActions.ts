// Eylem yaratıcıları (action creators) tanımlanıyor.

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

// Sepete öğe eklemek için eylem yaratıcısı.
export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

// Sepetten öğe çıkarmak için eylem yaratıcısı.
export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

// Sepeti temizlemek için eylem yaratıcısı.
export const clearCart = () => ({
  type: CLEAR_CART,
});
