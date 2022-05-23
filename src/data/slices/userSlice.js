import { Alert } from 'react-native';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from '../../core/routes/navigator';
import { setLoading } from './globalSlice';

// Google Login Packages
import auth from '@react-native-firebase/auth';

export const emailLogin = createAsyncThunk(
  'user/emailLogin',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const result = auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );

      if (result) {
        dispatch(setLoading(false));
        console.log(result);
        navigate('Main');
        dispatch(setLoading(true));
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const emailRegister = createAsyncThunk(
  'user/emailRegister',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const result = auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      if (result) {
        dispatch(setLoading(false));
        console.log(result);
        Alert.alert('Email berhasil didaftarkan', 'Silahkan Login', [
          {
            text: 'Login',
            onPress: () => navigate('Login'),
          },
        ]);
        dispatch(setLoading(true));
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

const initialState = {
  userInfo: {},
  id: '',
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: state => {
      return {
        ...state,
        userInfo: {},
        id: '',
        isLoading: false,
      };
    },
    setLogin: (state, action) => {
      return {
        ...state,
        userInfo: action.payload.additionalUserInfo.profile,
        id: action.payload.user.uid,
      };
    },
    setRegister: (state, action) => {
      return {
        ...state,
        userInfo: action.payload.additionalUserInfo.profile,
        id: action.payload.user.uid,
      };
    },
  },
});

export const { setLogout, setLogin, setRegister } = userSlice.actions;
export default userSlice.reducer;
