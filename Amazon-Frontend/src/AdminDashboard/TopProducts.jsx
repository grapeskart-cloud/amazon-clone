import React from "react";
import { ShoppingBag } from "lucide-react";

const TopProducts = ({ topProducts }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-lg mb-6">Top Products</h3>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingBag size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{product.sales} sales</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(product.sales / 500) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
