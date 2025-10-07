// src/components/EditProductModal.js
import React, { useState, useEffect } from 'react';

function EditProductModal({ product, sections, onSave, onClose }) {
  // Estados para los campos del formulario, inicializados con los datos del producto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [section, setSection] = useState('');

  // useEffect se asegura de que si el producto a editar cambia, el formulario se actualice
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setSection(product.section);
    }
  }, [product]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      name,
      price: parseFloat(price),
      image,
      section,
    };
    onSave(updatedProduct);
  };

  if (!product) return null; // No renderizar nada si no hay un producto para editar

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSave}>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          
          <label>Precio:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          
          <label>URL de Imagen:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          
          <label>Sección:</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
          
          <div className="modal-actions">
            <button type="submit" className="button-save">Guardar Cambios</button>
            <button type="button" onClick={onClose} className="button-close">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;