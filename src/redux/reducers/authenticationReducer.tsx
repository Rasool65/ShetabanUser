import { createSlice } from '@reduxjs/toolkit';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';

import { IAuthenticationReducerState } from '../states/IAuthenticationReducerState';

const tokenAuthentication = useTokenAuthentication();

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  return item ? JSON.parse(item) : {};
};

const initialAuthentication = () => {
  return tokenAuthentication.isAuthenticate();
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    isAuthenticate: initialAuthentication(),
  } as IAuthenticationReducerState,
  reducers: {
    handleLogin: (state, action) => {
      var result = action.payload;
      tokenAuthentication.saveLoginToken(result.data.data.auth.accessToken, result.data.data.auth.refreshToken);
      localStorage.setItem('userData', JSON.stringify(result.data.data.user));
      state.userData = result.data.data.user;
      state.isAuthenticate = true;
    },
    handleLogout: (state) => {
      tokenAuthentication.deleteLogoutToken();
      state.isAuthenticate = false;
      state.userData = undefined;
      localStorage.removeItem('userData');
    },
    reloadUserData: (state, action) => {
      var result = action.payload;
      localStorage.setItem('userData', JSON.stringify(result.data.data));
      state.userData = result.data.data;
    },
  },
});

export const { handleLogin, handleLogout, reloadUserData } = authSlice.actions;

export default authSlice.reducer;
