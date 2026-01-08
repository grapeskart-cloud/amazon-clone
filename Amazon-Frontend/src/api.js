const API_BASE_URL = "http://localhost:8000/api";

export const productAPI = {
  getProducts: () =>
    fetch(`${API_BASE_URL}/products`).then((res) => res.json()),

  getProduct: (id) =>
    fetch(`${API_BASE_URL}/products/${id}`).then((res) => res.json()),

  createProduct: (data) =>
    fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  updateProduct: (id, data) =>
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  deleteProduct: (id) =>
    fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" }),

  uploadProducts: (formData) =>
    fetch(`${API_BASE_URL}/products/upload`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json()),

  uploadImages: (formData) =>
    fetch(`${API_BASE_URL}/media/images`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json()),

  uploadVideos: (formData) =>
    fetch(`${API_BASE_URL}/media/videos`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json()),

  getApplications: () =>
    fetch(`${API_BASE_URL}/applications`).then((res) => res.json()),
};

export default API_BASE_URL;
