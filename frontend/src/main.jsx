import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import AppRoutes from './routes/AppRoutes'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import theme from './context/ThemeContext'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const queryClient = new QueryClient()
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ChakraProvider theme={theme}>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ChakraProvider>
          </PersistGate>
        </Provider>
      </ClerkProvider>
    </QueryClientProvider>
  </>
)