import { useEffect, useState } from "react";
import "./ProductForm.css";

function ProductForm({ product, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    reorderLevel: 5,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        reorderLevel: product.reorderLevel || 5,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="product-modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Add Product"}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="Enter SKU"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Reorder Level</label>
              <input
                type="number"
                name="reorderLevel"
                value={form.reorderLevel}
                onChange={handleChange}
                placeholder="5"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {product ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
