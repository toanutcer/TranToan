import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {persist} from 'mobx-persist';

class AuthStore {
  @persist @observable count = 0;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  increment() {
    this.count += 1;
  }

  @action.bound
  decrement() {
    this.count -= 1;
  }
}

// Instantiate the counter store.
export const authStore = new AuthStore();
// Create a React Context with the counter store instance.
export const AuthStoreContext = React.createContext(authStore);
export const useAuthStore = () => React.useContext(AuthStoreContext);
