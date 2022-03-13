import { ILayoutReducerState } from '../states/ILayoutReducerState';

// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '@src/configs/theme/themeConfig';

const initialMenuCollapsed = (): boolean => {
  const item = window.localStorage.getItem('menuCollapsed');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialDirection = (): boolean => {
  const item = window.localStorage.getItem('direction');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = (): string => {
  const item = window.localStorage.getItem('skin');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    skin: initialSkin(),
    isRTL: initialDirection(),
    layout: themeConfig.layout.type,
    lastLayout: themeConfig.layout.type,
    menuCollapsed: initialMenuCollapsed(),
    footerType: themeConfig.layout.footer.type,
    navbarType: themeConfig.layout.navbar.type,
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    routerTransition: themeConfig.layout.routerTransition,
    navbarColor: themeConfig.layout.navbar.backgroundColor,
  } as ILayoutReducerState,
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload;
      window.localStorage.setItem('direction', JSON.stringify(action.payload));
    },
    handleSkin: (state, action) => {
      state.skin = action.payload;
      window.localStorage.setItem('skin', JSON.stringify(action.payload));
    },
    handleLayout: (state, action) => {
      state.layout = action.payload;
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload;
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload;
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload;
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload));
    },
    handleRouterTransition: (state, action) => {
      state.routerTransition = action.payload;
    },
  },
});

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  handleRouterTransition,
} = layoutSlice.actions;

export default layoutSlice.reducer;
