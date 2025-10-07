import React, { useState, useEffect } from 'react'; // 1. Importa useEffect
import Header from './components/Header';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  // --- FUNCIÓN PARA CARGAR DATOS DESDE LOCALSTORAGE ---
  // Esta función intenta cargar datos guardados. Si no hay nada, devuelve un valor inicial.
  const loadFromLocalStorage = (key, initialValue) => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : initialValue;
    } catch (error) {
      console.error(`Error al cargar ${key} desde localStorage`, error);
      return initialValue;
    }
  };

  // --- ESTADOS INICIALIZADOS DESDE LOCALSTORAGE ---
  // Ahora, en lugar de empezar vacíos, los estados intentan cargarse desde localStorage.
  const [sections, setSections] = useState(() => loadFromLocalStorage('regalitos_sections', ['Artículos Nuevos', 'Artículos en Oferta']));
  const [products, setProducts] = useState(() => loadFromLocalStorage('regalitos_products', []));
  const [orders, setOrders] = useState(() => loadFromLocalStorage('regalitos_orders', []));
  
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showingLogin, setShowingLogin] = useState(false);

  // --- EFECTOS PARA GUARDAR DATOS EN LOCALSTORAGE ---
  // Estos `useEffect` se ejecutan automáticamente cada vez que los datos cambian, y los guardan.

  useEffect(() => {
    localStorage.setItem('regalitos_products', JSON.stringify(products));
  }, [products]); // Se ejecuta cada vez que el array 'products' cambia.

  useEffect(() => {
    localStorage.setItem('regalitos_sections', JSON.stringify(sections));
  }, [sections]); // Se ejecuta cada vez que el array 'sections' cambia.

  useEffect(() => {
    localStorage.setItem('regalitos_orders', JSON.stringify(orders));
  }, [orders]); // Se ejecuta cada vez que el array 'orders' cambia.


  // --- Todas tus otras funciones se quedan exactamente igual ---
  const addProduct = (product) => { /* ... */ };
  const deleteProduct = (productId) => { /* ... */ };
  // ... (todas las demás funciones: moveProduct, createSection, etc.)

  // --- LÓGICA DE RENDERIZADO (sin cambios) ---
  const renderContent = () => { /* ... */ };

  return (
    <div className="App">
      {/* ... (todo tu JSX se queda igual) ... */}
    </div>
  );
}

// Para que puedas copiar y pegar, aquí está el archivo completo de nuevo
// con las funciones que tenías, por si acaso.

function FullApp() {
  const loadFromLocalStorage = (key, initialValue) => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : initialValue;
    } catch (error) {
      console.error(`Error al cargar ${key} desde localStorage`, error);
      return initialValue;
    }
  };

  const [sections, setSections] = useState(() => loadFromLocalStorage('regalitos_sections', ['Artículos Nuevos', 'Artículos en Oferta']));
  const [products, setProducts] = useState(() => loadFromLocalStorage('regalitos_products', []));
  const [orders, setOrders] = useState(() => loadFromLocalStorage('regalitos_orders', []));
  
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showingLogin, setShowingLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem('regalitos_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('regalitos_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('regalitos_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product) => {
    if (!product || !product.name) {
      console.error("Se intentó agregar un producto inválido:", product);
      return;
    }
    setProducts([...products, { ...product, id: Date.now() }]);
  };
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
  const clearCart = () => setCart([]);
  const handleLogin = () => {
    setIsAdmin(true);
    setShowingLogin(false);
  };
  const handleLogout = () => setIsAdmin(false);

  const renderContent = () => {
    if (showingLogin) return <Login onLogin={handleLogin} />;
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
    return (
      <>
        <ShoppingCart cart={cart} onAddOrder={addOrder} onClearCart={clearCart} />
        {sections.map(section => (
          <ProductList key={section} title={section} products={products.filter(p => p.section === section)} onAddToCart={addToCart} />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <Header isAdmin={isAdmin} onShowLogin={() => setShowingLogin(true)} onLogout={handleLogout} />
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

// React recomienda que los hooks se llamen dentro de la función del componente, 
// por lo que he combinado la explicación de arriba en un solo bloque de código funcional.
// Simplemente reemplaza tu App.js completo con esto.
export default FullApp;
