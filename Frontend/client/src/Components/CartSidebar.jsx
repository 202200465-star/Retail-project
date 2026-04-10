import { useCart } from "../context/CartContext";
import axiosInstance, { getImageUrl } from "../config/axiosInstance";

function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to checkout");
      return;
    }
    try {
      const response = await axiosInstance.post("/orders", {
        orderItems: cartItems,
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Checkout successful! Order mock created.");
      clearCart();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar shadow position-fixed top-0 end-0 h-100 bg-white" style={{ width: "350px", zIndex: 1050, overflowY: "auto" }}>
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h4 className="m-0">Shopping Cart</h4>
        <button className="btn btn-close" onClick={onClose}></button>
      </div>
      <div className="p-3">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {cartItems.map((item) => (
              <div key={item.product} className="d-flex gap-2 border p-2 rounded align-items-center">
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.name} 
                  style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/50"; }}
                />
                <div className="flex-grow-1">
                  <h6 className="m-0">{item.name}</h6>
                  <small className="text-muted">{item.qty} x {item.price} EGP</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.product)}>X</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="p-3 border-top mt-auto">
          <div className="d-flex justify-content-between fw-bold mb-3">
            <span>Total:</span>
            <span>{totalPrice} EGP</span>
          </div>
          <button className="btn btn-success w-100" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
