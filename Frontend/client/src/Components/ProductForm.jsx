import { useEffect, useState } from "react";

function ProductForm({ onSubmit, editingProduct, cancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        description: editingProduct.description || "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
      });
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

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
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


// import { useEffect, useState } from "react";

// function ProductForm({ onSubmit, editingProduct, cancelEdit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (editingProduct) {
//       setFormData({
//         name: editingProduct.name || "",
//         price: editingProduct.price || "",
//         category: editingProduct.category || "",
//         description: editingProduct.description || "",
//       });
//     } else {
//       setFormData({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//       });
//     }
//   }, [editingProduct]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit({
//       ...formData,
//       price: Number(formData.price),
//     });

//     if (!editingProduct) {
//       setFormData({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//       });
//     }
//   };

//   return (
//     <div className="product-form-section">
//       <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>

//       <form onSubmit={handleSubmit} className="product-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <div className="product-button-group">
//           <button type="submit" className="product-submit-btn">
//             {editingProduct ? "Update Product" : "Add Product"}
//           </button>

//           {editingProduct && (
//             <button
//               type="button"
//               className="product-cancel-btn"
//               onClick={cancelEdit}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductForm;


// import { useEffect, useState } from "react";

// function ProductForm({ onSubmit, editingProduct, cancelEdit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: ""
//   });

//   useEffect(() => {
//     if (editingProduct) {
//       setFormData({
//         name: editingProduct.name,
//         price: editingProduct.price,
//         category: editingProduct.category,
//         description: editingProduct.description
//       });
//     } else {
//       setFormData({
//         name: "",
//         price: "",
//         category: "",
//         description: ""
//       });
//     }
//   }, [editingProduct]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit({
//       ...formData,
//       price: Number(formData.price)
//     });

//     if (!editingProduct) {
//       setFormData({
//         name: "",
//         price: "",
//         category: "",
//         description: ""
//       });
//     }
//   };

//   return (
//     <div className="product-form-section">
//       <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>

//       <form onSubmit={handleSubmit} className="product-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <div className="product-button-group">
//           <button type="submit" className="product-submit-btn">
//             {editingProduct ? "Update Product" : "Add Product"}
//           </button>

//           {editingProduct && (
//             <button
//               type="button"
//               className="product-cancel-btn"
//               onClick={cancelEdit}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductForm;