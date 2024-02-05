const {createSlice} = require('@reduxjs/toolkit');

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    addItemWishList: (state, action) => {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});

export const {addItemWishList} = WishlistSlice.actions;
export default WishlistSlice.reducer;
