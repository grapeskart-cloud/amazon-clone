import React, { useState } from "react";
import {
  FileText,
  Image,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Globe,
  Tag,
  Calendar,
  User,
  Plus,
  Upload,
} from "lucide-react";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("pages");
  const [pages, setPages] = useState([
    {
      id: 1,
      title: "Home Page",
      slug: "home",
      status: "Published",
      author: "Admin",
      lastUpdated: "2024-01-15",
      views: 1245,
    },
    {
      id: 2,
      title: "About Us",
      slug: "about",
      status: "Published",
      author: "Editor",
      lastUpdated: "2024-01-14",
      views: 567,
    },
    {
      id: 3,
      title: "Contact Us",
      slug: "contact",
      status: "Draft",
      author: "Editor",
      lastUpdated: "2024-01-13",
      views: 0,
    },
    {
      id: 4,
      title: "Privacy Policy",
      slug: "privacy",
      status: "Published",
      author: "Admin",
      lastUpdated: "2024-01-12",
      views: 321,
    },
  ]);

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "How to Start E-commerce Business",
      category: "Business",
      status: "Published",
      author: "Admin",
      date: "2024-01-15",
      comments: 24,
    },
    {
      id: 2,
      title: "Top 10 Marketing Strategies",
      category: "Marketing",
      status: "Published",
      author: "Editor",
      date: "2024-01-14",
      comments: 15,
    },
    {
      id: 3,
      title: "SEO Best Practices 2024",
      category: "SEO",
      status: "Draft",
      author: "Editor",
      date: "2024-01-13",
      comments: 0,
    },
    {
      id: 4,
      title: "Mobile App Development Guide",
      category: "Technology",
      status: "Scheduled",
      author: "Admin",
      date: "2024-01-20",
      comments: 0,
    },
  ]);

  const [media, setMedia] = useState([
    {
      id: 1,
      name: "banner-home.jpg",
      type: "image",
      size: "2.4 MB",
      uploaded: "2024-01-15",
      dimensions: "1920x1080",
    },
    {
      id: 2,
      name: "product-video.mp4",
      type: "video",
      size: "45.2 MB",
      uploaded: "2024-01-14",
      dimensions: "1280x720",
    },
    {
      id: 3,
      name: "logo.png",
      type: "image",
      size: "1.2 MB",
      uploaded: "2024-01-13",
      dimensions: "800x600",
    },
    {
      id: 4,
      name: "document.pdf",
      type: "document",
      size: "3.7 MB",
      uploaded: "2024-01-12",
      dimensions: "-",
    },
  ]);

  const [seoData, setSeoData] = useState({
    title: "My Website",
    description: "Best e-commerce platform in India",
    keywords: "ecommerce, shopping, online store",
    robots: "index, follow",
  });

  const [showPageModal, setShowPageModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
    status: "Draft",
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    status: "Draft",
  });

  const handleDeletePage = (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      setPages(pages.filter((page) => page.id !== id));
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogPosts(blogPosts.filter((post) => post.id !== id));
    }
  };

  const handleDeleteMedia = (id) => {
    if (window.confirm("Are you sure you want to delete this media file?")) {
      setMedia(media.filter((item) => item.id !== id));
    }
  };

  const handleCreatePage = () => {
    const newPageObj = {
      id: pages.length + 1,
      ...newPage,
      author: "Admin",
      lastUpdated: new Date().toISOString().split("T")[0],
      views: 0,
    };
    setPages([...pages, newPageObj]);
    setNewPage({ title: "", slug: "", content: "", status: "Draft" });
    setShowPageModal(false);
    alert("Page created successfully!");
  };

  const handleCreateBlog = () => {
    const newBlogObj = {
      id: blogPosts.length + 1,
      ...newBlog,
      author: "Admin",
      date: new Date().toISOString().split("T")[0],
      comments: 0,
    };
    setBlogPosts([...blogPosts, newBlogObj]);
    setNewBlog({
      title: "",
      category: "",
      content: "",
      tags: "",
      status: "Draft",
    });
    setShowBlogModal(false);
    alert("Blog post created successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Content Management (CMS)
          </h2>
          <p className="text-gray-600">
            Manage pages, blog posts, media, and SEO metadata
          </p>
        </div>
        <div className="flex gap-3">
          {activeTab === "pages" && (
            <button
              onClick={() => setShowPageModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus size={20} /> Add New Page
            </button>
          )}
          {activeTab === "blog" && (
            <button
              onClick={() => setShowBlogModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus size={20} /> Add New Post
            </button>
          )}
          {activeTab === "media" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Upload size={20} /> Upload Media
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {["pages", "blog", "media", "seo"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "pages" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Page Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Slug
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Author
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Last Updated
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Views
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-gray-400" />
                        <span className="font-medium">{page.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">/{page.slug}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          page.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : page.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span>{page.author}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {page.lastUpdated}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Eye size={14} className="text-gray-400" />
                        <span>{page.views}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {activeTab === "blog" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Post Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Author
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Comments
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-gray-400" />
                        <span className="font-medium">{post.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : post.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span>{post.author}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{post.date}</td>
                    <td className="py-3 px-4">{post.comments}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {activeTab === "media" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.type === "image" ? (
                    <Image size={24} className="text-gray-400" />
                  ) : item.type === "video" ? (
                    <FileText size={24} className="text-gray-400" />
                  ) : (
                    <FileText size={24} className="text-gray-400" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(item.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h4 className="font-medium truncate">{item.name}</h4>
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="capitalize">{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{item.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{item.uploaded}</span>
                </div>
                {item.dimensions !== "-" && (
                  <div className="flex justify-between">
                    <span>Dimensions:</span>
                    <span>{item.dimensions}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "seo" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-6">SEO Metadata Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Title
              </label>
              <input
                type="text"
                value={seoData.title}
                onChange={(e) =>
                  setSeoData({ ...seoData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter site title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={seoData.description}
                onChange={(e) =>
                  setSeoData({ ...seoData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Enter meta description"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 150-160 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={seoData.keywords}
                onChange={(e) =>
                  setSeoData({ ...seoData, keywords: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter keywords (comma separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Robots Meta Tag
              </label>
              <select
                value={seoData.robots}
                onChange={(e) =>
                  setSeoData({ ...seoData, robots: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="index, follow">Index, Follow</option>
                <option value="noindex, follow">Noindex, Follow</option>
                <option value="index, nofollow">Index, Nofollow</option>
                <option value="noindex, nofollow">Noindex, Nofollow</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Save SEO Settings
            </button>
          </div>
        </div>
      )}

      {showPageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create New Page</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={newPage.title}
                  onChange={(e) =>
                    setNewPage({ ...newPage, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={newPage.slug}
                  onChange={(e) =>
                    setNewPage({ ...newPage, slug: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter slug (e.g., about-us)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newPage.content}
                  onChange={(e) =>
                    setNewPage({ ...newPage, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows="10"
                  placeholder="Enter page content (HTML supported)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newPage.status}
                  onChange={(e) =>
                    setNewPage({ ...newPage, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}

      {showBlogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create New Blog Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newBlog.category}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={newBlog.tags}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, tags: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter tags (comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows="10"
                  placeholder="Enter blog content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newBlog.status}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowBlogModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBlog}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
