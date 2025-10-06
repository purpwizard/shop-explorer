import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { items, increment, decrement, removeItem, subtotal, clear } = useCart();

    if (items.length === 0)
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                Your cart is empty.
            </div>
        );

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-3 text-left">Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.productId} className="border-t">
                                <td className="py-2 px-3 flex items-center gap-3">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => decrement(item.productId)}
                                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button
                                        onClick={() => increment(item.productId)}
                                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                                    >
                                        +
                                    </button>
                                </td>
                                <td className="text-center">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td>
                                    <button
                                        onClick={() => removeItem(item.productId)}
                                        className="text-red-600 hover:underline cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-right mt-6">
                <p className="text-lg font-medium">
                    Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span>
                </p>
                <div className="mt-3 flex justify-end gap-2">
                    <button onClick={() => clear()} className="px-4 py-2 border rounded">
                        Clear Cart
                    </button>
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
