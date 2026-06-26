import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import ProductForm from "../../components/ProductForm";
import ProductTable from "../../components/ProductTable";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import "./style.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        search,
        category,
      });

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const handleSave = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, data);
        toast.success("Product updated successfully");
      } else {
        await createProduct(data);
        toast.success("Product added successfully");
      }

      fetchProducts();

      setShowModal(false);

      setSelectedProduct(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const categories = [...new Set(products.map((item) => item.category))];

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,

      totalCategories: categories.length,

      lowStock: products.filter((p) => p.stock <= p.reorderLevel).length,
    };
  }, [products]);

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Products</h1>

          <p>Manage your inventory products</p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setSelectedProduct(null);
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <h3>{stats.totalProducts}</h3>

            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h3>{stats.totalCategories}</h3>

            <p>Categories</p>
          </div>
        </div>

        <div className="stat-card low-stock-card">
          <div>
            <h3>{stats.lowStock}</h3>

            <p>Low Stock</p>
          </div>
        </div>
      </div>

      <div className="filters-card">
        <div className="search-box">
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-box">Loading products...</div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(product) => {
            setSelectedProduct(product);

            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Products;
