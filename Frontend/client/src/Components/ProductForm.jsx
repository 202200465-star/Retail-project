import { useEffect, useState } from "react";

function ProductForm({ onSubmit, editingProduct, cancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        description: editingProduct.description || "",
      });
      setImage(null);
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
      });
      setImage(null);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", Number(formData.price));
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image);
    }

    onSubmit(data);
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">
        <h3 className="fw-bold mb-4">
          {editingProduct ? "Update Product" : "Add Product"}
        </h3>

        <form onSubmit={submitForm}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="category"
                className="form-control"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-12">
              <label className="form-label text-muted small">Product Image (optional)</label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

          </div>

          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>

            {editingProduct && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

