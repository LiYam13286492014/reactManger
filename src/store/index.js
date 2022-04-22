import { createStore,combineReducers } from "redux";
import { HeadReducer } from "../reducer/HeadReducer";
import { LoadReducer } from "../reducer/LoadingReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const reducer =combineReducers({
    HeadReducer,
    LoadReducer
})
const persistConfig = {
    key: 'wwl',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor =persistStore(store)


export  {
    store,
    persistor
}