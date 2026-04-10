import { getImageUrl } from "../config/axiosInstance";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 product-card border-0 shadow-sm">
        <img 
          src={getImageUrl(product.image || '/uploads/default-product.png')} 
          className="card-img-top object-fit-cover" 
          alt={product.name}
          style={{ height: "200px" }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/200"; }}
        />
        <div className="card-body">
          <span className="badge bg-info text-dark mb-2">{product.category}</span>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success fs-5">{product.price} EGP</span>
          <button className="btn btn-sm btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;