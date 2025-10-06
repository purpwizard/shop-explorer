import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api";

type Product = {
    id: number;
    title: string;
    price: number;
    images: string[];
    category: { name: string };
};

export default function ProductList() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const filtered = useMemo(() => {
        if (!products) return [];
        return products.filter((p: Product) => {
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
            const matchCategory =
                category === "all" ? true : p.category?.name === category;
            return matchSearch && matchCategory;
        });
    }, [products, search, category]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories?.map((c: any) => (
                        <option key={c.id} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filtered.map((p: Product) => (
                    <Link
                        to={`/products/${p.id}`}
                        key={p.id}
                        className="border border-[#D9D9D9] rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden"
                    >
                        <img
                            src={p.images?.[0]}
                            alt={p.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-gray-800">{p.title}</h2>
                            <p className="text-gray-600 mt-1">${p.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
