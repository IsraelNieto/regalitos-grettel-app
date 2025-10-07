// src/components/OrdersView.js
import React from 'react';
// 1. Importa el icono de flecha
import { FaArrowLeft } from 'react-icons/fa';

function OrdersView({ orders, onBack }) {
  return (
    <div className="orders-view">
      <div className="orders-header">
        <h2>Pedidos Realizados</h2>
        {/* 2. Reemplaza el botón de texto con el icono */}
        <button onClick={onBack} className="back-button" title="Volver a productos">
          <FaArrowLeft />
        </button>
      </div>
      {orders.length === 0 ? (
        <p className="no-orders-message">Aún no hay pedidos guardados.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <span>Pedido #{order.id}</span>
                <span>{new Date(order.date).toLocaleDateString('es-MX')}</span>
              </div>
              <ul className="order-items-list">
                {order.items.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="order-total">
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersView;