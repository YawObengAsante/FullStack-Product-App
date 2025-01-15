import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch("api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to create product" };
    }

    const data = await res.json();
    if (!data.data) {
      return { success: false, message: "Unexpected response from server" };
    }

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created succesfully " };
  },
  getAllProducts: async () => {
    try {
      const res = await fetch("api/v1/products");
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to fetch products",
        };
      }

      const data = await res.json();
      if (!data || !Array.isArray(data.data)) {
        return { success: false, message: "Invalid response from server" };
      }

      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/v1/products/${pid}`, {
      method: "DELETE",
    });
    const data = res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
}));
