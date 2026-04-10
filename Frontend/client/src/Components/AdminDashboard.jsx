import { useEffect, useState } from "react";
import axiosInstance, { getImageUrl } from "../config/axiosInstance";
import ProductForm from "./ProductForm";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // "products" or "users"
  
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const authConfig = { headers: { Authorization: `Bearer ${token}` } };
  const PRODUCTS_API = "/products";
  const USERS_API = "/users";
  const ORDERS_API = "/orders/all";

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(PRODUCTS_API);
      setProducts(response.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch products");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(USERS_API, authConfig);
      setUsers(response.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(ORDERS_API, authConfig);
      setOrders(response.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  // ---- Product Methods ----
  const addProduct = async (data) => {
    try {
      const res = await axiosInstance.post(PRODUCTS_API, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert(res.data.message);
      fetchProducts();
    } catch (error) { alert("Error adding product"); }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await axiosInstance.put(`${PRODUCTS_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert(res.data.message);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) { alert("Error updating product"); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await axiosInstance.delete(`${PRODUCTS_API}/${id}`, authConfig);
      alert(res.data.message);
      fetchProducts();
    } catch (error) { alert("Error deleting product"); }
  };

  const handleProductSubmit = (data) => {
    if (editingProduct) updateProduct(editingProduct._id, data);
    else addProduct(data);
  };

  // ---- User Methods ----
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`${USERS_API}/${editingUser._id}`, editingUser, authConfig);
      alert(res.data.message);
      setEditingUser(null);
      fetchUsers();
    } catch (error) { alert("Error updating user"); }
  };

  return (
    <section className="py-5 admin-page-bg">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="fw-bold display-5 text-white">Admin Dashboard</h2>
          <p className="text-light">Command Center for Products and Users</p>
          
          <div className="btn-group mt-3 bg-white rounded shadow-sm">
            <button className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-light'}`} onClick={() => setActiveTab('products')}>Products</button>
            <button className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-light'}`} onClick={() => setActiveTab('users')}>Users</button>
            <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-light'}`} onClick={() => setActiveTab('orders')}>Orders</button>
          </div>
        </div>

        {activeTab === "products" && (
          <>
            <ProductForm onSubmit={handleProductSubmit} editingProduct={editingProduct} cancelEdit={() => setEditingProduct(null)} />
            <div className="row g-4">
              {products.map((product) => (
                <div className="col-md-6 col-lg-4" key={product._id}>
                  <div className="card h-100 shadow border-0">
                    <div className="card-body">
                      <span className="badge bg-warning text-dark mb-2">{product.category}</span>
                      <h5 className="fw-bold">{product.name}</h5>
                      <p className="text-muted">{product.description}</p>
                      <p className="fw-bold text-success">{product.price} EGP</p>
                    </div>
                    <div className="card-footer bg-white border-0 d-flex gap-2">
                      <button className="btn btn-outline-primary w-50" onClick={() => setEditingProduct(product)}>Edit</button>
                      <button className="btn btn-outline-danger w-50" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="card shadow border-0 p-4">
            <h4 className="mb-4 fw-bold">User Management</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <img 
                          src={getImageUrl(u.profilePhoto || '/uploads/default.png')} 
                          alt="avatar" 
                          width="40" height="40" 
                          className="rounded-circle object-fit-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40"; }}
                        />
                      </td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className={`badge ${u.role==='admin' ? 'bg-danger' : 'bg-secondary'}`}>{u.role}</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingUser(u)}>Edit Role/Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingUser && (
              <div className="mt-4 p-4 border rounded bg-light">
                <h5>Edit User: {editingUser.name}</h5>
                <form onSubmit={updateUser}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name:e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email:e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Role</label>
                      <select className="form-select" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role:e.target.value})}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-success">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="card shadow border-0 p-4">
            <h4 className="mb-4 fw-bold">Orders List</h4>
            {orders.length === 0 ? (
              <p className="text-muted">No orders found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>User</th>
                      <th>Items</th>
                      <th>Total Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id}>
                        <td><small className="text-muted">{o._id}</small></td>
                        <td>
                          <div className="fw-bold">{o.user?.name || "Unknown"}</div>
                          <div className="text-muted small">{o.user?.email || "No email"}</div>
                        </td>
                        <td>
                          <ul className="list-unstyled mb-0 small text-muted">
                            {o.orderItems.map((item, idx) => (
                              <li key={idx}>{item.qty} x {item.name}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="fw-bold text-success">{o.totalPrice} EGP</td>
                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;