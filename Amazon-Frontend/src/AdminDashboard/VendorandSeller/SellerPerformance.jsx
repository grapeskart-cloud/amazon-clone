import { useEffect, useState } from "react";
import axios from "axios";

function SellerPerformance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8000/api/admin/seller-performance";

  const fetchPerformance = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setData(res.data.data || res.data); // flexible
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  // 🔢 Calculations
  const topSeller = data.reduce(
    (max, s) => (s.totalRevenue > (max?.totalRevenue || 0) ? s : max),
    null
  );

  const avgRating =
    (data.reduce((sum, s) => sum + (s.rating || 0), 0) / data.length).toFixed(
      1
    ) || 0;

  const returnRate = (
    (data.reduce((sum, s) => sum + s.cancelledOrders, 0) /
      data.reduce((sum, s) => sum + s.totalOrders, 0)) *
    100
  ).toFixed(1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Performance</h1>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold">Top Seller</h3>
          <p className="text-xl font-bold">{topSeller?.seller?.name || "-"}</p>
          <p className="text-green-600">₹{topSeller?.totalRevenue || 0}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold">Avg Rating</h3>
          <p className="text-3xl font-bold text-yellow-600">{avgRating} ★</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold">Avg Orders</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(
              data.reduce((s, d) => s + d.totalOrders, 0) / data.length
            ).toFixed(0)}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold">Return Rate</h3>
          <p className="text-3xl font-bold text-red-600">{returnRate || 0}%</p>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="font-semibold mb-4">Performance Metrics</h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Seller</th>
              <th className="px-4 py-3 text-left">Revenue</th>
              <th className="px-4 py-3 text-left">Orders</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Cancel %</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-3">{item.seller?.name}</td>
                <td className="px-4 py-3">₹{item.totalRevenue}</td>
                <td className="px-4 py-3">{item.totalOrders}</td>
                <td className="px-4 py-3">{item.rating} ★</td>
                <td className="px-4 py-3">
                  {((item.cancelledOrders / item.totalOrders) * 100).toFixed(1)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerPerformance;
