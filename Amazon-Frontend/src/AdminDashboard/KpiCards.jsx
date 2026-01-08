import React from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";

const KPICards = ({ kpis }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Users":
        return Users;
      case "DollarSign":
        return DollarSign;
      case "ShoppingCart":
        return ShoppingCart;
      case "Package":
        return Package;
      default:
        return Users;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = getIcon(kpi.icon);
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-2">{kpi.value}</h3>
                <div
                  className={`inline-flex items-center gap-1 mt-2 ${
                    kpi.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">{kpi.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${kpi.color}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
