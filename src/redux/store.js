import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeSliceReducer from './theme/themeSlice.js';
import userSliceReducer from './user/userSlice.js';

const persistConfig = {
  key: 'hexagonal717-datafloat-userflow',
  version: 1,
  storage,
  whitelist: ['themeSlice','usersSlice'],
};

const rootReducer = combineReducers({
  themeSlice: themeSliceReducer,
  usersSlice: userSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
