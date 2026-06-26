import "./style.css";

function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Add a new product to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const isLowStock = product.stock <= product.reorderLevel;

              return (
                <tr key={product._id}>
                  <td className="product-name">{product.name}</td>

                  <td>
                    <span className="sku-badge">{product.sku}</span>
                  </td>

                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>

                  <td>₹{product.price.toLocaleString()}</td>

                  <td>
                    <span
                      className={`stock-badge ${
                        isLowStock ? "low-stock" : "in-stock"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>{product.reorderLevel}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => onDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
