import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Register TokoHappy
        </h2>
        <p className="mb-4">
          Halaman register sedang dalam tahap pengembangan.
        </p>
        <Link to="/login" className="text-blue-500 underline">
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
