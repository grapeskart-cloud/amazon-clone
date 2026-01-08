// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10);

//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     status: "",
//     featured: "",
//     minPrice: "",
//     maxPrice: "",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     stock: "",
//     featured: false,
//     status: "active",
//     tags: "",
//     images: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const API_BASE = "http://localhost:8000";

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/48";

//     if (imagePath.startsWith("http")) {
//       return imagePath;
//     }

//     return `${API_BASE}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit, ...filters };
//       Object.keys(params).forEach((key) => {
//         if (!params[key] && params[key] !== false) delete params[key];
//       });

//       const response = await axios.get(`${API_BASE}/api/products`, { params });
//       setProducts(response.data.data);
//       setTotal(response.data.total);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page, filters]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);

//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };

//   const handleCreateProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", newProduct.name);
//     formData.append("description", newProduct.description);
//     formData.append("price", newProduct.price);
//     formData.append("category", newProduct.category);
//     formData.append("stock", newProduct.stock);
//     formData.append("featured", newProduct.featured);
//     formData.append("status", newProduct.status);
//     formData.append("tags", newProduct.tags);

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       const response = await axios.post(`${API_BASE}/api/products`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         setShowModal(false);
//         setNewProduct({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           stock: "",
//           featured: false,
//           status: "active",
//           tags: "",
//           images: [],
//         });
//         setImageFiles([]);
//         setImagePreviews([]);
//         fetchProducts();
//       }
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", editingProduct.name);
//     formData.append("description", editingProduct.description);
//     formData.append("price", editingProduct.price);
//     formData.append("category", editingProduct.category);
//     formData.append("stock", editingProduct.stock);
//     formData.append("featured", editingProduct.featured);
//     formData.append("status", editingProduct.status);
//     formData.append("tags", editingProduct.tags);

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       const response = await axios.put(
//         `${API_BASE}/api/products/${editingProduct._id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response.data.success) {
//         setShowModal(false);
//         setEditingProduct(null);
//         setImageFiles([]);
//         setImagePreviews([]);
//         fetchProducts();
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`${API_BASE}/api/products/${id}`);
//         fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(`${API_BASE}/api/products/${id}/status`, { status });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditingProduct(product);
//     setShowModal(true);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Product Management
//             </h1>
//             <p className="text-gray-600 mt-1">Total Products: {total}</p>
//           </div>
//           <button
//             onClick={() => {
//               setEditingProduct(null);
//               setShowModal(true);
//             }}
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
//           >
//             Add New Product
//           </button>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Search
//               </label>
//               <input
//                 type="text"
//                 name="search"
//                 value={filters.search}
//                 onChange={handleFilterChange}
//                 placeholder="Search products..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 name="category"
//                 value={filters.category}
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">All Categories</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="clothing">Clothing</option>
//                 <option value="home">Home</option>
//                 <option value="books">Books</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Min Price
//                 </label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   placeholder="Min"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Max Price
//                 </label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   placeholder="Max"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-700">Show featured:</span>
//               <select
//                 name="featured"
//                 value={filters.featured}
//                 onChange={handleFilterChange}
//                 className="px-3 py-1 border border-gray-300 rounded-lg"
//               >
//                 <option value="">All</option>
//                 <option value="true">Featured Only</option>
//                 <option value="false">Not Featured</option>
//               </select>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//                 disabled={page === 1}
//                 className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setPage((prev) => Math.min(totalPages, prev + 1))
//                 }
//                 disabled={page === totalPages}
//                 className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Stock
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Featured
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {products.map((product) => (
//                     <tr key={product._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="h-12 w-12 flex-shrink-0">
//                             <img
//                               className="h-12 w-12 rounded-lg object-cover"
//                               src={getImageUrl(product.images?.[0])}
//                               alt={product.name}
//                             />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {product.name}
//                             </div>
//                             <div className="text-sm text-gray-500 truncate max-w-xs">
//                               {product.description}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                           {product.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         ${product.price}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             product.stock > 10
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {product.stock} units
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <select
//                           value={product.status}
//                           onChange={(e) =>
//                             handleStatusChange(product._id, e.target.value)
//                           }
//                           className={`px-3 py-1 text-xs font-semibold rounded-full border ${
//                             product.status === "active"
//                               ? "bg-green-100 text-green-800"
//                               : product.status === "inactive"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           <option value="active">Active</option>
//                           <option value="inactive">Inactive</option>
//                           <option value="draft">Draft</option>
//                         </select>
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => {
//                             const updatedProduct = {
//                               ...product,
//                               featured: !product.featured,
//                             };
//                             handleEditClick(updatedProduct);
//                           }}
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                             product.featured
//                               ? "bg-purple-100 text-purple-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {product.featured ? "Featured" : "Not Featured"}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleEditClick(product)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteProduct(product._id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-20 mx-auto p-4 border w-full max-w-4xl shadow-lg rounded-xl bg-white">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {editingProduct ? "Edit Product" : "Add New Product"}
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditingProduct(null);
//                   setImageFiles([]);
//                   setImagePreviews([]);
//                 }}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <form
//               onSubmit={
//                 editingProduct ? handleUpdateProduct : handleCreateProduct
//               }
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* ... Form inputs (same as before) ... */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     value={
//                       editingProduct ? editingProduct.name : newProduct.name
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           name: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({ ...newProduct, name: e.target.value });
//                       }
//                     }}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category
//                   </label>
//                   <select
//                     value={
//                       editingProduct
//                         ? editingProduct.category
//                         : newProduct.category
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           category: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({
//                           ...newProduct,
//                           category: e.target.value,
//                         });
//                       }
//                     }}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="clothing">Clothing</option>
//                     <option value="home">Home & Garden</option>
//                     <option value="books">Books</option>
//                     <option value="sports">Sports</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price ($)
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={
//                       editingProduct ? editingProduct.price : newProduct.price
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           price: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({ ...newProduct, price: e.target.value });
//                       }
//                     }}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="number"
//                     value={
//                       editingProduct ? editingProduct.stock : newProduct.stock
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           stock: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({ ...newProduct, stock: e.target.value });
//                       }
//                     }}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     value={
//                       editingProduct
//                         ? editingProduct.description
//                         : newProduct.description
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           description: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({
//                           ...newProduct,
//                           description: e.target.value,
//                         });
//                       }
//                     }}
//                     rows="3"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tags (comma separated)
//                   </label>
//                   <input
//                     type="text"
//                     value={
//                       editingProduct ? editingProduct.tags : newProduct.tags
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           tags: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({ ...newProduct, tags: e.target.value });
//                       }
//                     }}
//                     placeholder="tag1, tag2, tag3"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status
//                   </label>
//                   <select
//                     value={
//                       editingProduct ? editingProduct.status : newProduct.status
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           status: e.target.value,
//                         });
//                       } else {
//                         setNewProduct({
//                           ...newProduct,
//                           status: e.target.value,
//                         });
//                       }
//                     }}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="draft">Draft</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="featured"
//                     checked={
//                       editingProduct
//                         ? editingProduct.featured
//                         : newProduct.featured
//                     }
//                     onChange={(e) => {
//                       if (editingProduct) {
//                         setEditingProduct({
//                           ...editingProduct,
//                           featured: e.target.checked,
//                         });
//                       } else {
//                         setNewProduct({
//                           ...newProduct,
//                           featured: e.target.checked,
//                         });
//                       }
//                     }}
//                     className="h-5 w-5 text-indigo-600 rounded"
//                   />
//                   <label
//                     htmlFor="featured"
//                     className="ml-2 text-sm text-gray-700"
//                   >
//                     Mark as Featured Product
//                   </label>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Images{" "}
//                     {!editingProduct && "(At least one image required)"}
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-gray-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-gray-600">
//                         <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
//                           <span>Upload images</span>
//                           <input
//                             type="file"
//                             multiple
//                             onChange={handleImageChange}
//                             className="sr-only"
//                             accept="image/*"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                     </div>
//                   </div>

//                   {(imagePreviews.length > 0 ||
//                     editingProduct?.images?.length > 0) && (
//                     <div className="mt-4">
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {imagePreviews.map((preview, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={preview}
//                               alt={`Preview ${index}`}
//                               className="h-32 w-full object-cover rounded-lg"
//                             />
//                           </div>
//                         ))}
//                         {editingProduct?.images?.map((image, index) => (
//                           <div key={index} className="relative">
//                             <img
//                               src={getImageUrl(image)}
//                               alt={`Product ${index}`}
//                               className="h-32 w-full object-cover rounded-lg"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingProduct(null);
//                     setImageFiles([]);
//                     setImagePreviews([]);
//                   }}
//                   className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                 >
//                   {editingProduct ? "Update Product" : "Create Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductManagement;
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    featured: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    featured: "",
    minPrice: "",
    maxPrice: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
    status: "active",
    tags: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const API_BASE = "http://localhost:8000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/48";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${API_BASE}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page, limit, ...filters };
      Object.keys(params).forEach((key) => {
        if (!params[key] && params[key] !== false) delete params[key];
      });

      const response = await axios.get(`${API_BASE}/api/products`, { params });
      setProducts(response.data.data);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);

      // Calculate statistics
      const data = response.data.data;
      const lowStockCount = data.filter(
        (product) => product.stock <= 10
      ).length;
      const featuredCount = data.filter((product) => product.featured).length;

      setStats({
        total: response.data.total,
        lowStock: lowStockCount,
        featured: featuredCount,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("featured", newProduct.featured);
    formData.append("status", newProduct.status);
    formData.append("tags", newProduct.tags);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(`${API_BASE}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setShowModal(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          featured: false,
          status: "active",
          tags: "",
          images: [],
        });
        setImageFiles([]);
        setImagePreviews([]);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", editingProduct.price);
    formData.append("category", editingProduct.category);
    formData.append("stock", editingProduct.stock);
    formData.append("featured", editingProduct.featured);
    formData.append("status", editingProduct.status);
    formData.append("tags", editingProduct.tags);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.put(
        `${API_BASE}/api/products/${editingProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setShowModal(false);
        setEditingProduct(null);
        setImageFiles([]);
        setImagePreviews([]);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/api/products/${id}/status`, { status });
      fetchProducts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Product Management
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Add New Product
          </button>
        </div>

        {/* Summary Dashboard Section - ADDED HERE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Low Stock Products
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.lowStock}
                </p>
                <p className="text-xs text-gray-500">Stock ≤ 10 units</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Featured Products
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.featured}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End of Summary Dashboard Section */}

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show featured:</span>
              <select
                name="featured"
                value={filters.featured}
                onChange={handleFilterChange}
                className="px-3 py-1 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                <option value="true">Featured Only</option>
                <option value="false">Not Featured</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={getImageUrl(product.images?.[0])}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={product.status}
                          onChange={(e) =>
                            handleStatusChange(product._id, e.target.value)
                          }
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : product.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="draft">Draft</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            const updatedProduct = {
                              ...product,
                              featured: !product.featured,
                            };
                            handleEditClick(updatedProduct);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.featured
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.featured ? "Featured" : "Not Featured"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-4 border w-full max-w-4xl shadow-lg rounded-xl bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  setImageFiles([]);
                  setImagePreviews([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={
                editingProduct ? handleUpdateProduct : handleCreateProduct
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* ... Form inputs (same as before) ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={
                      editingProduct ? editingProduct.name : newProduct.name
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        });
                      } else {
                        setNewProduct({ ...newProduct, name: e.target.value });
                      }
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={
                      editingProduct
                        ? editingProduct.category
                        : newProduct.category
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                        });
                      } else {
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        });
                      }
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Garden</option>
                    <option value="books">Books</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={
                      editingProduct ? editingProduct.price : newProduct.price
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        });
                      } else {
                        setNewProduct({ ...newProduct, price: e.target.value });
                      }
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={
                      editingProduct ? editingProduct.stock : newProduct.stock
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          stock: e.target.value,
                        });
                      } else {
                        setNewProduct({ ...newProduct, stock: e.target.value });
                      }
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={
                      editingProduct
                        ? editingProduct.description
                        : newProduct.description
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        });
                      } else {
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        });
                      }
                    }}
                    rows="3"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      editingProduct ? editingProduct.tags : newProduct.tags
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          tags: e.target.value,
                        });
                      } else {
                        setNewProduct({ ...newProduct, tags: e.target.value });
                      }
                    }}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={
                      editingProduct ? editingProduct.status : newProduct.status
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          status: e.target.value,
                        });
                      } else {
                        setNewProduct({
                          ...newProduct,
                          status: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={
                      editingProduct
                        ? editingProduct.featured
                        : newProduct.featured
                    }
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          featured: e.target.checked,
                        });
                      } else {
                        setNewProduct({
                          ...newProduct,
                          featured: e.target.checked,
                        });
                      }
                    }}
                    className="h-5 w-5 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Mark as Featured Product
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images{" "}
                    {!editingProduct && "(At least one image required)"}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload images</span>
                          <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="sr-only"
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>

                  {(imagePreviews.length > 0 ||
                    editingProduct?.images?.length > 0) && (
                    <div className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-32 w-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                        {editingProduct?.images?.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={getImageUrl(image)}
                              alt={`Product ${index}`}
                              className="h-32 w-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    setImageFiles([]);
                    setImagePreviews([]);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
