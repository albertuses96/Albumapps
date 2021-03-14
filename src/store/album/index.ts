import { createStore, createHook } from 'react-sweet-state';
import { Album } from '../../domain/album'

export interface IState {
  loading: boolean,
  albums: null | Album[]
}

const initialState: IState = {
  loading: false,
  albums: null
}

const Store = createStore({
  // value of the store on initialisation
  initialState: initialState,
  // actions that trigger store mutation
  actions: {
    store: (albums: Album[]) => ({ setState }) => {
      // mutate state synchronously
      setState({
        loading: false,
        albums: albums,
      });
    },
    initLoad: () => ({ setState }) => {
      // mutate state synchronously
      setState({
        loading: true,
      });
    },
  },
  // optional, mostly used for easy debugging
  name: 'albums',
});

export const useAlbumStore = createHook(Store);