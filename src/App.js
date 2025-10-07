import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  // --- ESTADOS ---
  const [sections, setSections] = useState(['Artículos Nuevos', 'Artículos en Oferta']);
 // --- LÍNEA CORREGIDA ---
  // Inicializamos el estado de productos como un arreglo verdaderamente vacío.
  const [products, setProducts] = useState([]); 
  
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showingLogin, setShowingLogin] = useState(false);
  const [orders, setOrders] = useState([]);

  // --- FUNCIONES ---
  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const deleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };
  const moveProduct = (productId, newSection) => setProducts(products.map(p => p.id === productId ? { ...p, section: newSection } : p));
  const createSection = (newSectionName) => {
    if (newSectionName && !sections.includes(newSectionName)) {
      setSections([...sections, newSectionName]);
    } else {
      alert('El nombre de la sección no es válido o ya existe.');
    }
  };
  const updateProduct = (updatedProduct) => setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const addOrder = (order) => setOrders([...orders, order]);
  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]); // Función para vaciar el carrito
  const handleLogin = () => {
    setIsAdmin(true);
    setShowingLogin(false);
  };
  const handleLogout = () => setIsAdmin(false);

  // --- LÓGICA DE RENDERIZADO ---
  const renderContent = () => {
    if (showingLogin) {
      return <Login onLogin={handleLogin} />;
    }
    
    if (isAdmin) {
      return (
        <AdminPanel
          products={products}
          sections={sections}
          orders={orders}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
          onMoveProduct={moveProduct}
          onCreateSection={createSection}
          onUpdateProduct={updateProduct}
        />
      );
    }

    // Si es un usuario público, muestra el carrito y los productos
    return (
      <>
        <ShoppingCart cart={cart} onAddOrder={addOrder} onClearCart={clearCart} />
        {sections.map(section => (
          <ProductList 
            key={section}
            title={section} 
            products={products.filter(p => p.section === section)} 
            onAddToCart={addToCart} 
          />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <Header 
        isAdmin={isAdmin}
        onShowLogin={() => setShowingLogin(true)}
        onLogout={handleLogout}
      />
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
