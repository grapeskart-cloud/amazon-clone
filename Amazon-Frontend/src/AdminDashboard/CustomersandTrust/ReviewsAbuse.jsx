import React, { useState } from "react";

export default function ReviewAndAbuse() {
  const [search, setSearch] = useState("");

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Review",
      refId: "REV-1001",
      user: "Aman Chaudhary",
      content: "Product quality is very bad",
      reason: "Abusive Language",
      status: "Pending",
      date: "2026-01-06",
    },
    {
      id: 2,
      type: "Review",
      refId: "REV-1009",
      user: "Rohit Sharma",
      content: "Fake product delivered",
      reason: "False Information",
      status: "Resolved",
      date: "2026-01-04",
    },
    {
      id: 3,
      type: "Abuse",
      refId: "USR-3321",
      user: "Neha Verma",
      content: "User sending spam messages",
      reason: "Spam / Harassment",
      status: "In Review",
      date: "2026-01-03",
    },
  ]);

  const filtered = reports.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.refId.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Review & Abuse Management</h1>

      <div className="flex justify-between mb-6 gap-4 flex-col sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by User or ID..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{r.refId}</span>
              <span className="text-xs text-gray-500">{r.date}</span>
            </div>

            <p className="text-sm font-medium">{r.user}</p>
            <p className="text-sm text-gray-600 mt-1">{r.content}</p>

            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {r.type}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                {r.reason}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  r.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : r.status === "In Review"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {r.status}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStatus(r.id, "In Review")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500"
              >
                Review
              </button>
              <button
                onClick={() => updateStatus(r.id, "Resolved")}
                className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Type",
                "Ref ID",
                "User",
                "Content",
                "Reason",
                "Status",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4">{r.type}</td>
                <td className="px-6 py-4">{r.refId}</td>
                <td className="px-6 py-4">{r.user}</td>
                <td className="px-6 py-4 max-w-xs truncate">{r.content}</td>
                <td className="px-6 py-4">{r.reason}</td>
                <td className="px-6 py-4">{r.status}</td>
                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(r.id, "In Review")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-yellow-500 to-yellow-400"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => updateStatus(r.id, "Resolved")}
                    className="px-3 py-1 text-xs text-white rounded bg-gradient-to-r from-green-500 to-green-400"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
