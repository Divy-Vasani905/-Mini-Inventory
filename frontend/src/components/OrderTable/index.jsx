import "./style.css";

function OrderTable({ orders, onStatusChange }) {
  if (!orders.length) {
    return (
      <div className="empty-orders">
        <h3>No orders found</h3>
        <p>Create your first order to get started.</p>
      </div>
    );
  }

  return (
    <div className="orders-table-card">
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="customer-name">{order.customerName}</div>
                </td>

                <td>
                  <div className="product-list">
                    {order.items.map((item) => (
                      <span className="product-chip" key={item.productId?._id}>
                        {item.productId?.name}
                        {" × "}
                        {item.quantity}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="order-total">
                  ₹{order.totalAmount.toLocaleString()}
                </td>

                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {order.status !== "Cancelled" ? (
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>

                      <option value="Confirmed">Confirmed</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className="disabled-text">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
