import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { user, cart, clearCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    bank: "",
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    alert(
      `Transaction success by ${formData.fullName} with total price $${totalPrice}`,
    );
    clearCart();
    navigate("/about");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg h-fit">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Checkout TokoHappy
        </h1>
        <div className="mb-6 border p-4 rounded-lg bg-blue-50">
          <h2 className="text-xl font-bold mb-4 border-b border-blue-200 pb-2">
            Ringkasan Pesanan
          </h2>
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-2">
              <span>
                {item.title} (x{item.qty})
              </span>
              <span className="font-semibold">
                Rp {(item.price * item.qty * 15000).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <div className="border-t border-blue-200 pt-3 mt-4 flex justify-between">
            <strong className="text-xl">Total:</strong>
            <strong className="text-2xl text-blue-600">${totalPrice}</strong>
          </div>
        </div>
        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <input
            type="text"
            value={user?.username || "Guest"}
            disabled
            className="border p-3 bg-gray-200 rounded"
          />
          <input
            type="text"
            placeholder="Nama Lengkap"
            required
            className="border p-3 rounded"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Nomor Telepon"
            required
            className="border p-3 rounded"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Alamat Email"
            required
            className="border p-3 rounded"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <textarea
            placeholder="Alamat Rumah"
            required
            className="border p-3 rounded"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="Nomor Rekening Bank"
            required
            className="border p-3 rounded"
            onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-blue-700"
          >
            Selesaikan Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
}
