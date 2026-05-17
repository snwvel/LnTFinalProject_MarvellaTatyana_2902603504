import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white p-6">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-white text-gray-800 p-10 rounded-xl shadow-2xl text-center max-w-lg">
        <motion.h1 animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl font-extrabold mb-4 text-blue-600">Selamat Datang di TokoHappy!</motion.h1>
        <p className="text-lg mb-6">Belanja segala kebutuhanmu dengan mudah, cepat, dan pastinya bikin happy!</p>
        <Link to="/products"><button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition">Mulai Belanja</button></Link>
      </motion.div>
    </div>
  );
}