import axios from "axios";

const API = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1"
});

export const fetchProducts = async () => {
    const res = await API.get("/products");
    return res.data;
};

export const fetchProduct = async (id: number) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
};

export const fetchCategories = async () => {
    const res = await API.get("/categories");
    return res.data;
};

export const simulateAddToCart = async (payload: any) => {
    console.log(payload);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.9) resolve({ success: true });
            else reject(new Error("Failed to add to cart (simulated)"));
        }, 600);
    });
};
