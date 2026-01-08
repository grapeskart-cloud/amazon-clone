import { User, RefreshCw } from "lucide-react";
const ActivityLogs = ({ userActivity }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Activity Logs</h3>
        <RefreshCw size={20} className="text-gray-400 cursor-pointer" />
      </div>
      <div className="space-y-4">
        {userActivity.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-gray-100 rounded-full">
              <User size={16} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.user}</p>
              <p className="text-gray-600 text-sm">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
