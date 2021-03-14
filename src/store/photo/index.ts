import { createStore, createHook } from 'react-sweet-state';
import {Photo} from '../../domain/photo'

export interface IState {
  loading: boolean,
  photos: null | Photo[]
}

const initialState: IState = {
  loading: false,
  photos: null
}

const Store = createStore({
  // value of the store on initialisation
  initialState: initialState,
  // actions that trigger store mutation
  actions: {
    store: (photos: Photo[]) => ({ setState }) => {
      // mutate state synchronously
      setState({
        loading: false,
        photos: photos,
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
  name: 'photos',
});

export const usePhotoStore = createHook(Store);