// src/components/TicketModal.js
import React from 'react';
import html2canvas from 'html2canvas';
import Ticket from './Ticket';

function TicketModal({ cart, total, onClose }) {

  const handleSaveImage = () => {
    const ticketElement = document.getElementById('ticket-to-save');
    
    html2canvas(ticketElement, { 
      useCORS: true, // Importante si la imagen tuviera problemas
      logging: true,
      scale: 2 // Mejora la resolución de la imagen
    }).then(canvas => {
      // Convertir el canvas a una URL de imagen
      const image = canvas.toDataURL('image/png');
      
      // Crear un enlace temporal para descargar la imagen
      const link = document.createElement('a');
      link.href = image;
      link.download = `pedido-regalitos-grettel-${Date.now()}.png`;
      link.click();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Aquí renderizamos el ticket visual */}
        <Ticket cart={cart} total={total} />
        
        <div className="modal-actions">
          <button onClick={handleSaveImage} className="button-save">Guardar como Imagen</button>
          <button onClick={onClose} className="button-close">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;