import React from "react";
import { Bell } from "lucide-react";

const NotificationsPanel = ({ notifications }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-80">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Notifications</h4>
            <Bell size={18} className="text-gray-400" />
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                !notification.read ? "bg-blue-50" : ""
              }`}
            >
              <p className="text-sm">{notification.text}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-gray-50 rounded-b-xl">
          <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
