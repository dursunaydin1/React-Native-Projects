// Redux kütüphanelerini ve middleware'leri içeriye alıyoruz.
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducer'ları bir araya getiriyoruz.
import cartItems from "./reducers/cartItem";

const reducers = combineReducers({
  cartItems,
});

// Redux store'u oluşturuyoruz, Redux DevTools ve Redux Thunk middleware'leri ile birlikte kullanarak.
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// Oluşturduğumuz store'u dışa aktarıyoruz.
export default store;
