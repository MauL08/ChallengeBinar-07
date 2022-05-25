import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: state => {
      return {
        ...state,
        id: '',
      };
    },
    setLogin: (state, action) => {
      return {
        ...state,
        id: action.payload.user.uid,
      };
    },
    setRegister: (state, action) => {
      return {
        ...state,
        id: action.payload.user.uid,
      };
    },
  },
});

export const { setLogout, setLogin, setRegister } = userSlice.actions;
export default userSlice.reducer;
