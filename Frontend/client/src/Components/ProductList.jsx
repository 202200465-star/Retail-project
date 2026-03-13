function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list-section">
      <h2>Products List</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>

              <div className="product-card-buttons">
                <button
                  onClick={() => onEdit(product)}
                  className="product-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="product-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;