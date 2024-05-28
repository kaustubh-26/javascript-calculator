import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './app/store.tsx'
import { Provider } from 'react-redux'
import Header from './components/Header.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={ store }>
    <Header />
    <App />
  </Provider>,
)
