import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers/root';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(throttle(() => {
  console.debug('saveState');
  const { app } = store.getState();
  saveState({
    app
  })
}, 1000));
