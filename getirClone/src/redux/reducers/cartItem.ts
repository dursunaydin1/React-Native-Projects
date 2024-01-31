import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";
// Reducer fonksiyonunu tanımlıyoruz.
const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Yeni öğeyi sepete eklemek için mevcut durumu ve yeni öğeyi birleştiriyoruz.
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      // Belirli bir öğeyi sepetteki öğelerden filtreliyoruz.
      return state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id
      );

    case CLEAR_CART:
      // Sepeti temizlemek için durumu sıfırlıyoruz.
      return [];

    default:
      // Herhangi bir tanımlı eylem türü yoksa mevcut durumu geri döndürüyoruz.
      return state;
  }
};

// Reducer'ı dışa aktarıyoruz.
export default cartItems;
