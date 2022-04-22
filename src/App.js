import React from 'react'
import { Provider } from 'react-redux';
import{ store,persistor }from './store';
import { PersistGate } from 'redux-persist/integration/react'

import IndexRouter from './router';
export default function App() {
  return (
    
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <IndexRouter/>  
        </PersistGate>
        
    </Provider>
    
        
        // <Box/>
    
    
  )
}
