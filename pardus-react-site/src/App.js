import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/urun/:id" element={<ProductDetail />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/odeme" element={<CheckoutPage />} />
              <Route path="/koleksiyon-kesfet" element={<CategoryPage />} />
              <Route path="/kategori/:categoryName" element={<CategoryPage />} />
              <Route path="/kramponlar" element={<CategoryPage />} />
              <Route path="/sneakers" element={<CategoryPage />} />
              <Route path="/kosu-ayakkabilari" element={<CategoryPage />} />
              <Route path="/terlikler" element={<CategoryPage />} />
              <Route path="/urunler" element={<CategoryPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* Diğer sayfalar için rotalar buraya eklenecek */}
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
