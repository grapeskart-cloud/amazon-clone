import React, { useState } from "react";

export default function EmailSMSManagement() {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchSMS, setSearchSMS] = useState("");

  const pushEmailsData = [
    {
      id: 1,
      title: "New Year Greetings",
      recipients: 1200,
      sentDate: "2026-01-01",
      status: "Sent",
    },
    {
      id: 2,
      title: "Product Launch",
      recipients: 850,
      sentDate: "2026-01-03",
      status: "Draft",
    },
    {
      id: 3,
      title: "Special Offer",
      recipients: 1000,
      sentDate: "2026-01-05",
      status: "Scheduled",
    },
  ];

  const smsCampaignsData = [
    {
      id: 1,
      title: "Flash Sale SMS",
      recipients: 500,
      sentDate: "2026-01-02",
      status: "Sent",
    },
    {
      id: 2,
      title: "Cart Abandonment",
      recipients: 300,
      sentDate: "2026-01-04",
      status: "Draft",
    },
    {
      id: 3,
      title: "Membership Offer",
      recipients: 450,
      sentDate: "2026-01-06",
      status: "Scheduled",
    },
  ];

  const [pushEmails] = useState(pushEmailsData);
  const [smsCampaigns] = useState(smsCampaignsData);

  const filteredEmails = pushEmails.filter((e) =>
    e.title.toLowerCase().includes(searchEmail.toLowerCase())
  );
  const filteredSMS = smsCampaigns.filter((s) =>
    s.title.toLowerCase().includes(searchSMS.toLowerCase())
  );

  const statusColors = {
    Sent: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Scheduled: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-12">
      <h1 className="text-2xl font-bold mb-6">Communication Management</h1>

      {/* Push Email Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold">Push Emails</h2>
          <input
            type="text"
            placeholder="Search Emails..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded shadow hover:from-indigo-700 hover:to-indigo-600 transition duration-300">
            + Add Email
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {filteredEmails.map((e) => (
            <div
              key={e.id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    statusColors[e.status]
                  }`}
                >
                  {e.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Recipients: {e.recipients}
              </p>
              <p className="text-gray-500 text-sm mt-1">Date: {e.sentDate}</p>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SMS Campaign Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold">SMS Campaigns</h2>
          <input
            type="text"
            placeholder="Search SMS..."
            value={searchSMS}
            onChange={(e) => setSearchSMS(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded shadow hover:from-purple-700 hover:to-purple-600 transition duration-300">
            + Add SMS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {filteredSMS.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    statusColors[s.status]
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Recipients: {s.recipients}
              </p>
              <p className="text-gray-500 text-sm mt-1">Date: {s.sentDate}</p>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
