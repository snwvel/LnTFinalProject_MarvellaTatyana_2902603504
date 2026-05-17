import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const API_URL = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setProducts(products.filter((p) => p.id !== id));
    alert("Product deleted!");
  };

  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel - TokoHappy</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-6 font-bold">
        Add New Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow bg-white">
            <img
              src={p.images[0]}
              alt={p.title}
              className="h-40 w-full object-cover mb-4 rounded"
            />
            <h2 className="font-bold text-lg truncate">{p.title}</h2>
            <p className="text-green-600 font-bold mb-4">
              Rp {(p.price * 15000).toLocaleString("id-ID")}
            </p>
            <div className="flex gap-2">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full">
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
