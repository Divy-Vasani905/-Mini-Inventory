import api from "./api";

export const getOrders = () => {
  return api.get("/orders");
};

export const createOrder = (data) => {
  return api.post("/orders", data);
};

export const updateOrderStatus = (id, status) => {
  return api.put(`/orders/${id}/status`, { status });
};
