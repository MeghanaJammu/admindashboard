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

  // New: skip saving to localStorage on first mount
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  // Save only after initial load
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
    <div className="p-4 space-y-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1 rounded bg-gray-800 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleAddProduct}
            className="bg-purple-600 px-4 py-1 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {isEditing && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-800 p-4 rounded space-y-2"
        >
          <div className="grid md:grid-cols-4 gap-2">
            <input
              className="p-2 rounded bg-gray-700"
              placeholder="Name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              required
            />
            <input
              className="p-2 rounded bg-gray-700"
              placeholder="Category"
              value={editProduct.category}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
              required
            />
            <input
              className="p-2 rounded bg-gray-700"
              type="number"
              placeholder="Stock"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({ ...editProduct, stock: +e.target.value })
              }
              required
            />
            <input
              className="p-2 rounded bg-gray-700"
              type="number"
              placeholder="Price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: +e.target.value })
              }
              required
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-green-600 px-4 py-1 rounded">
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditProduct(null);
              }}
              type="button"
              className="bg-gray-600 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto bg-[#1e293b] rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-300">
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
                  className="p-2 text-left cursor-pointer hover:text-white"
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
                  className="border-t border-gray-700 hover:bg-gray-700/20"
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
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected.length > 0 && (
        <div className="flex justify-between items-center p-2 rounded bg-gray-800">
          <span>{selected.length} selected</span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 px-3 py-1 rounded text-sm"
            >
              Delete Selected
            </button>
            <button className="bg-gray-600 px-3 py-1 rounded text-sm">
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
