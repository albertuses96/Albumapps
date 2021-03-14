import { createStore, createHook } from 'react-sweet-state';
import {User} from '../../domain/user'

export interface IState {
  loading: boolean,
  users: null | User[]
}

const initialState: IState = {
  loading: false,
  users: null
}

const Store = createStore({
  // value of the store on initialisation
  initialState: initialState,
  // actions that trigger store mutation
  actions: {
    store: (users: User[]) => ({ setState }) => {
      // mutate state synchronously
      setState({
        loading: false,
        users: users,
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
  name: 'users',
});

export const useUserStore = createHook(Store);