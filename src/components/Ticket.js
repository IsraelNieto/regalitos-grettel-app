// src/components/Ticket.js
import React from 'react';

// Este componente es solo la parte visual del ticket
// Le pasamos los datos que necesita para mostrarse
function Ticket({ cart, total }) {
  return (
    // Le damos un ID a este div para que html2canvas sepa qué elemento convertir a imagen
    <div id="ticket-to-save" className="ticket-container">
      <img src="./Regalitos-Grettel.png" alt="Logo" className="ticket-logo" />
      <h2>¡Gracias por tu pedido!</h2>
      <p><strong>Fecha:</strong> {new Date().toLocaleString('es-MX')}</p>
      <hr />
      <div className="ticket-items">
        {cart.map((item, index) => (
          <div key={index} className="ticket-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr />
      <div className="ticket-total">
        <strong>Total:</strong>
        <strong>${total}</strong>
      </div>
      <p className="ticket-footer">Este es un comprobante de tu solicitud de pedido.</p>
    </div>
  );
}

export default Ticket;