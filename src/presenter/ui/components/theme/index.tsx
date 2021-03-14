import { createStore, createHook } from 'react-sweet-state';

enum Theme {
  light = 'light'
}

export interface IStyle {
  color: {
    indigo: '#0d3880',
    pink: '#e60278',
    grey: 'rgba(28,28,28,.6313725490196078)',
    darkText: '#404040',
    darkerIndigo: 'rgb(6, 27, 79)',
    blue: 'rgb(31, 77, 196)',
  },
  theme: Theme
}


const initialState: IStyle = {
  color: {
    indigo: '#0d3880',
    pink: '#e60278',
    grey: 'rgba(28,28,28,.6313725490196078)',
    darkText: '#404040',
    darkerIndigo: 'rgb(6, 27, 79)',
    blue: 'rgb(31, 77, 196)',
  },
  theme: Theme.light
}

const Store = createStore({
  // value of the store on initialisation
  initialState: initialState,
  // actions that trigger store mutation
  actions: {
    setTheme: (newTheme: Theme) => ({ setState }) => {
      // mutate state synchronously
      setState({
        theme: newTheme
      });
    },
  },
  // optional, mostly used for easy debugging
  name: 'styles',
});

export const useGlobalStyles = createHook(Store);