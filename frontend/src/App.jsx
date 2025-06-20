import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderDetailsPage from './pages/OrderDetailsPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/order-details/:id' element={<OrderDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
