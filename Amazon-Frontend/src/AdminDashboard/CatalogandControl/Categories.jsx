import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Eye,
  Grid,
  List,
  CheckCircle,
  XCircle,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/categories";
const IMAGE_BASE_URL = "http://localhost:8000"; // Image server URL

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    parentCategory: "",
    isFeatured: false,
    image: null,
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    featured: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalCategories, setTotalCategories] = useState(0);

  // Image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [filters, currentPage]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.featured) params.append("featured", filters.featured);

      const response = await axios.get(`${API_BASE_URL}?${params}`);

      if (response.data.success) {
        // Image URLs ko properly format karein
        const categoriesWithFullImageUrls = response.data.data.map(
          (category) => {
            // Debug ke liye console mein check karein
            console.log("Category Image:", category.image);

            // Check karein image URL kaise hai
            let imageUrl = null;

            if (category.image) {
              // Agar image complete URL hai
              if (category.image.startsWith("http")) {
                imageUrl = category.image;
              }
              // Agar image relative path hai
              else if (category.image.startsWith("/")) {
                imageUrl = `${IMAGE_BASE_URL}${category.image}`;
              }
              // Agar image sirf filename hai
              else {
                imageUrl = `${IMAGE_BASE_URL}/uploads/${category.image}`;
              }
            }

            return {
              ...category,
              image: imageUrl,
            };
          }
        );

        setCategories(categoriesWithFullImageUrls);
        setTotalCategories(response.data.count || response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) {
      return imagePath;
    } else if (imagePath.startsWith("/")) {
      return `${IMAGE_BASE_URL}${imagePath}`;
    } else {
      return `${IMAGE_BASE_URL}/uploads/${imagePath}`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData.image instanceof File) {
          formDataToSend.append("image", formData.image);
        } else if (formData[key] !== "" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      let response;
      if (editingCategory) {
        response = await axios.put(
          `${API_BASE_URL}/${editingCategory._id}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post(API_BASE_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.success) {
        fetchCategories();
        resetForm();
        setShowModal(false);
        alert(
          editingCategory
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert(error.response?.data?.message || "Failed to save category");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      status: category.status,
      parentCategory: category.parentCategory?._id || "",
      isFeatured: category.isFeatured || false,
      image: null,
    });
    // Image preview ke liye full URL use karein
    setImagePreview(getImageUrl(category.image));
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.data.success) {
        fetchCategories();
        setShowDeleteModal(false);
        alert("Category deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data?.message || "Failed to delete category");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      status: "active",
      parentCategory: "",
      isFeatured: false,
      image: null,
    });
    setImagePreview(null);
    setEditingCategory(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      featured: "",
    });
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      draft: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFeaturedBadge = (isFeatured) => {
    return isFeatured ? (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <CheckCircle size={12} /> Featured
      </span>
    ) : (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <XCircle size={12} /> Regular
      </span>
    );
  };

  const totalPages = Math.ceil(totalCategories / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your product categories and subcategories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold mt-1">{totalCategories}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Grid className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold mt-1">
                  {categories.filter((c) => c.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold mt-1">
                  {categories.filter((c) => c.isFeatured).length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Eye className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold mt-1">
                  {categories.filter((c) => c.status === "inactive").length}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>

            <select
              name="featured"
              value={filters.featured}
              onChange={handleFilterChange}
              className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="true">Featured</option>
              <option value="false">Regular</option>
            </select>

            {(filters.search || filters.status || filters.featured) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800"
              >
                <X size={18} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCategories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Agar image load nahi hoti toh fallback dikhayein
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `
                            <div class="flex items-center justify-center h-full w-full bg-gray-100">
                              <div class="text-center">
                                <ImageIcon class="mx-auto text-gray-400 mb-2" size={32} />
                                <p class="text-xs text-gray-500">Image not found</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="text-gray-400" size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {getFeaturedBadge(category.isFeatured)}
                    </div>
                    <div className="absolute top-3 left-3">
                      {getStatusBadge(category.status)}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {category.name}
                        </h3>
                        {category.parentCategory && (
                          <p className="text-sm text-gray-500 mt-1">
                            Parent: {category.parentCategory.name}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {category.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <span>Slug: {category.slug}</span>
                      <span>
                        {new Date(category.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentCategories.map((category) => (
                      <tr key={category._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0">
                              {category.image ? (
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="h-10 w-10 rounded-lg object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.innerHTML = `
                                      <div class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <ImageIcon size={16} class="text-gray-400" />
                                      </div>
                                    `;
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                  <ImageIcon
                                    size={16}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(category.status)}
                        </td>
                        <td className="px-6 py-4">
                          {getFeaturedBadge(category.isFeatured)}
                        </td>
                        <td className="px-6 py-4">
                          {category.parentCategory ? (
                            <span className="text-sm text-gray-600">
                              {category.parentCategory.name}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingCategory(category);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={16} />
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, totalCategories)}
                </span>{" "}
                of <span className="font-medium">{totalCategories}</span>{" "}
                categories
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter category name"
                    />
                  </div>

                  {/* Parent Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Category
                    </label>
                    <select
                      name="parentCategory"
                      value={formData.parentCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">None (Main Category)</option>
                      {categories
                        .filter(
                          (c) =>
                            !editingCategory || c._id !== editingCategory._id
                        )
                        .map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category description"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <ImageIcon
                            className="mx-auto text-gray-400 mb-3"
                            size={40}
                          />
                          <p className="text-sm text-gray-600 mb-1">
                            Click to upload category image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {(imagePreview || editingCategory?.image) && (
                      <div className="relative">
                        <img
                          src={
                            imagePreview || getImageUrl(editingCategory.image)
                          }
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = `
                              <div class="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                                <ImageIcon size={24} class="text-gray-400" />
                              </div>
                            `;
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Featured Category
                      </p>
                      <p className="text-sm text-gray-600">
                        Show this category as featured
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {editingCategory ? "Update Category" : "Create Category"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Delete Category
                  </h3>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <span className="font-bold">{editingCategory.name}</span>?
                </p>
                {editingCategory.image && (
                  <div className="mt-3">
                    <img
                      src={getImageUrl(editingCategory.image)}
                      alt={editingCategory.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(editingCategory._id)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete Category
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
