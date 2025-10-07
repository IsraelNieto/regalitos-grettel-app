import React, { useState } from 'react';
import EditProductModal from './EditProductModal';
import OrdersView from './OrdersView';

function AdminPanel({ products, sections, orders, onAddProduct, onDeleteProduct, onMoveProduct, onCreateSection, onUpdateProduct }) {
  // Estado para el formulario de nuevo producto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [selectedSection, setSelectedSection] = useState(sections[0] || '');

  // Estado para el formulario de nueva sección
  const [newSectionName, setNewSectionName] = useState('');

  // Estados para controlar la vista actual
  const [view, setView] = useState('products'); // 'products' u 'orders'
  const [editingProduct, setEditingProduct] = useState(null); // Producto que se está editando

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image || !selectedSection) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onAddProduct({ name, price: parseFloat(price), image, section: selectedSection });
    setName('');
    setPrice('');
    setImage('');
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    onCreateSection(newSectionName);
    setNewSectionName('');
  };

  const handleUpdateProduct = (updatedProduct) => {
    onUpdateProduct(updatedProduct);
    setEditingProduct(null); // Cierra el modal al guardar
  };

  // Si la vista es 'orders', muestra solo el componente de pedidos
  if (view === 'orders') {
    return <OrdersView orders={orders} onBack={() => setView('products')} />;
  }

  // Si la vista es 'products', muestra el panel de administración principal
  return (
    <div className="admin-panel">
      {/* El Modal para Editar Producto siempre está disponible pero solo se muestra si hay un 'editingProduct' */}
      <EditProductModal 
        product={editingProduct}
        sections={sections}
        onSave={handleUpdateProduct}
        onClose={() => setEditingProduct(null)}
      />

      <h2>Panel de Administrador</h2>

      {/* Botón principal para cambiar de vista */}
      <div className="admin-section">
        <h3>Gestión Principal</h3>
        <button onClick={() => setView('orders')}>Ver Pedidos Realizados ({orders.length})</button>
      </div>

      {/* Módulo para Agregar Productos */}
      <div className="admin-section">
        <h3>Agregar Nuevo Producto</h3>
        <form onSubmit={handleAddSubmit}>
          <input type="text" placeholder="Nombre del producto" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="text" placeholder="URL de la imagen" value={image} onChange={(e) => setImage(e.target.value)} />
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="" disabled>-- Elige una sección --</option>
            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
          <button type="submit">Agregar Producto</button>
        </form>
      </div>

      {/* Módulo para Crear Secciones */}
      <div className="admin-section">
        <h3>Crear Nueva Sección</h3>
        <form onSubmit={handleSectionSubmit}>
          <input type="text" placeholder="Nombre de la nueva sección" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} />
          <button type="submit">Crear Sección</button>
        </form>
      </div>

      {/* Módulo para Gestionar Productos Existentes */}
      <div className="admin-section">
        <h3>Gestionar Productos Existentes</h3>
        <div className="product-manage-list">
          {products.map(product => (
            <div key={product.id} className="product-manage-item">
              <span>{product.name}</span>
              <div className="product-controls">
                <select value={product.section} onChange={(e) => onMoveProduct(product.id, e.target.value)}>
                  {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                </select>
                <button onClick={() => setEditingProduct(product)} className="edit-btn">Editar</button>
                <button onClick={() => onDeleteProduct(product.id)} className="delete-btn">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;