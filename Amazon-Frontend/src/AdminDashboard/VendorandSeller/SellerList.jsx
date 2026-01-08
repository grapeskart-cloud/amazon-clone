import { useEffect, useState } from "react";
import axios from "axios";

function SellerList() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newSeller, setNewSeller] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const BASE_URL = "http://localhost:8000/api/admin/sellers";
  const fetchSellers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setSellers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching sellers:", err);
    } finally {
      setLoading(false);
    }
  };

  const createSeller = async () => {
    if (!newSeller.name || !newSeller.email) {
      alert("Name and Email are required");
      return;
    }
    try {
      await axios.post(BASE_URL, newSeller);
      setNewSeller({ name: "", email: "", phone: "", company: "" });
      setShowModal(false);
      fetchSellers();
    } catch (err) {
      console.error("Error creating seller:", err);
    }
  };

  const updateSeller = async () => {
    if (!selectedSeller) return;
    try {
      await axios.put(`${BASE_URL}/${selectedSeller._id}`, selectedSeller);
      setEditMode(false);
      setSelectedSeller(null);
      fetchSellers();
    } catch (err) {
      console.error("Error updating seller:", err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axios.patch(`${BASE_URL}/${id}/status`, { status });
      fetchSellers();
    } catch (err) {
      console.error("Error changing status:", err);
    }
  };

  const deleteSeller = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchSellers();
    } catch (err) {
      console.error("Error deleting seller:", err);
    }
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || seller.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    fetchSellers();
  }, []);

  const stats = {
    total: sellers.length,
    active: sellers.filter((s) => s.status === "active").length,
    pending: sellers.filter((s) => s.status === "pending").length,
    newSellers: sellers.filter((s) => {
      const createdAt = new Date(s.createdAt);
      const diff = (new Date() - createdAt) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    }).length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "blocked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sellers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Seller Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all sellers in your platform
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            + Add New Seller
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <p className="text-gray-600">Total Sellers</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.total}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <p className="text-gray-600">Active Sellers</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.active}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <p className="text-gray-600">New (30 days)</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.newSellers}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <p className="text-gray-600">Pending Approval</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {stats.pending}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Seller
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {seller.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {seller.name}
                          </div>
                          {seller.company && (
                            <div className="text-sm text-gray-500">
                              {seller.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {seller.email}
                      </div>
                      {seller.phone && (
                        <div className="text-sm text-gray-500">
                          {seller.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          seller.status
                        )}`}
                      >
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(seller.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSeller(seller);
                            setEditMode(false);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSeller({ ...seller });
                            setEditMode(true);
                          }}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm hover:bg-green-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => changeStatus(seller._id, "active")}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm hover:bg-green-200"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => changeStatus(seller._id, "pending")}
                          className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded text-sm hover:bg-yellow-200"
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => changeStatus(seller._id, "suspended")}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                        >
                          Suspend
                        </button>
                        <button
                          onClick={() => deleteSeller(seller._id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSellers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No sellers found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add New Seller
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newSeller.name}
                    onChange={(e) =>
                      setNewSeller({ ...newSeller, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newSeller.email}
                    onChange={(e) =>
                      setNewSeller({ ...newSeller, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newSeller.phone}
                    onChange={(e) =>
                      setNewSeller({ ...newSeller, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newSeller.company}
                    onChange={(e) =>
                      setNewSeller({ ...newSeller, company: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={createSeller}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedSeller && !editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Seller Details
                  </h3>
                  <p className="text-gray-600">
                    Complete information about seller
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedSeller.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      {selectedSeller.name}
                    </h4>
                    <p className="text-gray-600">{selectedSeller.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedSeller.email}</p>
                  </div>
                  {selectedSeller.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{selectedSeller.phone}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-medium">
                      {new Date(selectedSeller.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedSeller.status
                      )}`}
                    >
                      {selectedSeller.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit Seller
                  </button>
                  <button
                    onClick={() => setSelectedSeller(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedSeller && editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Edit Seller
                  </h3>
                  <p className="text-gray-600">Update seller information</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedSeller(null);
                    setEditMode(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={selectedSeller.name}
                    onChange={(e) =>
                      setSelectedSeller({
                        ...selectedSeller,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedSeller.email}
                    onChange={(e) =>
                      setSelectedSeller({
                        ...selectedSeller,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={selectedSeller.phone || ""}
                    onChange={(e) =>
                      setSelectedSeller({
                        ...selectedSeller,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={selectedSeller.status}
                    onChange={(e) =>
                      setSelectedSeller({
                        ...selectedSeller,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedSeller(null);
                    setEditMode(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={updateSeller}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerList;
