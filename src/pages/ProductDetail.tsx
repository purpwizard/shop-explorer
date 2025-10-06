import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProduct, simulateAddToCart } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem, removeItem } = useCart();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(Number(id)),
    });

    const mutation = useMutation({
        mutationFn: simulateAddToCart,
        onMutate: () => {
            if (!product) return;
            addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.images?.[0],
            });
        },
        onError: () => {
            if (product) removeItem(product.id);
            alert("Failed to add to cart (simulated error)");
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <img
                src={product.images?.[0]}
                alt={product.title}
                className="rounded-lg w-full object-cover"
            />
            <div>
                <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>
                <p className="text-gray-700 mb-4">Category : <strong>{product.category.name}</strong></p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                <button
                    onClick={() => mutation.mutate({ productId: product.id, quantity: 1 })}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition cursor-pointer"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
