import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ title, products, onAddToCart }) {
  return (
    <section className="product-section">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;