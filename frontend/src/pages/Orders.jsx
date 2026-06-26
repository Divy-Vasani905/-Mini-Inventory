import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../services/orderService";

import { getProducts } from "../services/productService";

import OrderForm from "../components/OrderForm";

import OrderTable from "../components/OrderTable";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders();

    setOrders(res.data);
  };

  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res.data);
  };

  useEffect(() => {
    fetchOrders();

    fetchProducts();
  }, []);

  const handleCreateOrder = async (data) => {
    try {
      await createOrder(data);

      fetchOrders();

      fetchProducts();

      toast.success("Order created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      fetchOrders();

      fetchProducts();

      toast.success("Order status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  };

  return (
    <div>
      <h1>Orders</h1>

      <OrderForm products={products} onSubmit={handleCreateOrder} />

      <OrderTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}

export default Orders;
