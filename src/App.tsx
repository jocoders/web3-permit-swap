import { Provider } from './Provider'
import { HomeScreen } from './screens/Home'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider>
          <HomeScreen />
        </Provider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
