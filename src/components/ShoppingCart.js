import React, { useState } from 'react';
import TicketModal from './TicketModal';

// Recibe la nueva prop onClearCart
function ShoppingCart({ cart, onAddOrder, onClearCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleOrder = () => {
    // 1. Prepara el mensaje para WhatsApp
    const phoneNumber = '529611816238'; // Reemplaza con tu número
    let message = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
    
    cart.forEach(item => {
      message += `- ${item.name} - $${item.price.toFixed(2)}\n`;
    });
    
    const totalAmount = getTotal();
    message += `\n*Total: $${totalAmount.toFixed(2)}*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // 2. Abre WhatsApp
    window.open(whatsappUrl, '_blank');

    // 3. Guarda el pedido en el estado principal
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: totalAmount,
    };
    onAddOrder(newOrder);

    // 4. Muestra el modal y cierra el dropdown
    setShowTicket(true);
    setIsOpen(false);
  };

  // Nueva función que se ejecutará al cerrar el ticket
  const handleCloseTicket = () => {
    setShowTicket(false); // Cierra el modal
    onClearCart();      // Limpia el carrito
  };

  return (
    <>
      <div className="shopping-cart">
        <button onClick={() => setIsOpen(!isOpen)}>
          🛒 Carrito ({cart.length})
        </button>
        {isOpen && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <hr />
                <p className="cart-total">Total: ${getTotal().toFixed(2)}</p>
                <button onClick={handleOrder} className="order-button">
                  Realizar Pedido por WhatsApp
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {showTicket && (
        <TicketModal
          cart={cart}
          total={getTotal().toFixed(2)}
          onClose={handleCloseTicket} // Se usa la nueva función aquí
        />
      )}
    </>
  );
}

export default ShoppingCart;