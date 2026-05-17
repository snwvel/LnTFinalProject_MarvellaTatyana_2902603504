import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => setProducts(res.data.slice(0, 10)));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Katalog Produk</h1>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
        >
          🛒 Keranjang ({cart.length})
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border p-4 rounded-xl shadow flex flex-col"
          >
            <img
              src={p.images[0]}
              alt={p.title}
              className="h-48 w-full object-cover mb-4 rounded-lg"
            />
            <h2 className="font-bold truncate">{p.title}</h2>
            <p className="text-blue-600 font-bold text-xl my-2">
              Rp {(p.price * 15000).toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => {
                addToCart(p, 1);
                alert("Ditambahkan ke keranjang!");
              }}
              className="mt-auto bg-green-500 text-white px-4 py-2 rounded font-bold"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
