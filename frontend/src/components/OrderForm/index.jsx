import { useState } from "react";
import "./style.css";

function OrderForm({ products, onSubmit }) {
  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      customerName,
      items,
    });

    setCustomerName("");

    setItems([
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  return (
    <div className="order-form-card">
      <div className="order-header">
        <h2>Create Order</h2>

        <p>Create a new customer order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="products-section">
          <div className="section-header">
            <h3>Products</h3>

            <button type="button" className="add-product-btn" onClick={addItem}>
              + Add Product
            </button>
          </div>

          {items.map((item, index) => (
            <div className="order-item-row" key={index}>
              <select
                value={item.productId}
                onChange={(e) =>
                  handleItemChange(index, "productId", e.target.value)
                }
                required
              >
                <option value="">Select Product</option>

                {products
                  .filter((product) => product.stock > 0)
                  .map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                      {" • Stock: "}
                      {product.stock}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
              />

              {items.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="submit-section">
          <button className="create-order-btn" type="submit">
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
