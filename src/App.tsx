import { Routes, Route, Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import CartPage from "./pages/CartPage.tsx";

export default function App() {
    const { totalItems } = useCart();

    return (
        <div>
            <header className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-semibold text-gray-800">
                        Shop Explorer
                    </Link>
                    <Link to="/cart" className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10m0 0a2 2 0 11-4 0m4 0a2 2 0 104 0"
                            />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-1.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
        </div>
    );
}
