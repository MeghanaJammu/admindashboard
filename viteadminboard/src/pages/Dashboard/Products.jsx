import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const LOCAL_KEY = "admin_products_list";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setProducts(JSON.parse(stored));
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(products));
    }
  }, [products, hasLoaded]);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
    const sorted = [...products].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setProducts(sorted);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setSelected((prev) => prev.filter((pid) => pid !== id));
  };

  const handleBulkDelete = () => {
    setProducts(products.filter((p) => !selected.includes(p.id)));
    setSelected([]);
  };

  const handleAddProduct = () => {
    setEditProduct({ id: null, name: "", category: "", stock: 0, price: 0 });
    setIsEditing(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editProduct.id === null) {
      const newProduct = { ...editProduct, id: Date.now() };
      setProducts([newProduct, ...products]);
    } else {
      const updated = products.map((p) =>
        p.id === editProduct.id ? editProduct : p
      );
      setProducts(updated);
    }
    setIsEditing(false);
    setEditProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-4 space-y-6"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1 rounded text-sm"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleAddProduct}
            className="px-4 py-1 rounded flex items-center gap-2"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {isEditing && (
        <form
          onSubmit={handleFormSubmit}
          className="p-4 rounded space-y-2"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="grid md:grid-cols-4 gap-2">
            {["name", "category", "stock", "price"].map((field, idx) => (
              <input
                key={idx}
                className="p-2 rounded"
                style={{
                  backgroundColor: "var(--input)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                type={
                  field === "stock" || field === "price" ? "number" : "text"
                }
                value={editProduct[field]}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    [field]:
                      field === "stock" || field === "price"
                        ? +e.target.value
                        : e.target.value,
                  })
                }
                required
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-1 rounded"
              style={{ backgroundColor: "var(--success)", color: "#fff" }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditProduct(null);
              }}
              className="px-4 py-1 rounded"
              style={{ backgroundColor: "var(--border)", color: "var(--text)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        className="overflow-x-auto rounded-lg shadow"
        style={{ backgroundColor: "var(--card)" }}
      >
        <table className="w-full text-sm">
          <thead
            style={{
              backgroundColor: "var(--table-header)",
              color: "var(--text)",
            }}
          >
            <tr>
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? setSelected(filteredProducts.map((p) => p.id))
                      : setSelected([])
                  }
                  checked={
                    selected.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                />
              </th>
              {["name", "category", "stock", "price"].map((field) => (
                <th
                  key={field}
                  className="p-2 text-left cursor-pointer"
                  onClick={() => handleSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  {sortField === field && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              ))}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  style={{ borderTop: "1px solid var(--border)" }}
                  className="hover:bg-opacity-20"
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2">${product.price}</td>
                  <td className="p-2 flex gap-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      style={{ color: "var(--accent)" }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{ color: "var(--danger)" }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4"
                  style={{ color: "var(--muted)" }}
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected.length > 0 && (
        <div
          className="flex justify-between items-center p-2 rounded"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <span>{selected.length} selected</span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 rounded text-sm"
              style={{ backgroundColor: "var(--danger)", color: "#fff" }}
            >
              Delete Selected
            </button>
            <button
              className="px-3 py-1 rounded text-sm"
              style={{ backgroundColor: "var(--border)", color: "var(--text)" }}
            >
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
