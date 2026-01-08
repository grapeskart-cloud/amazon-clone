import React from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";

function Chat() {
  return (
    <div className="flex h-[85vh] bg-gray-100 rounded-lg overflow-hidden">
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Support Chats</h2>
          <div className="mt-3 relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search seller"
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {["Seller One", "Seller Two", "Seller Three"].map((seller, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {seller[0]}
              </div>
              <div>
                <p className="text-sm font-semibold">{seller}</p>
                <p className="text-xs text-gray-500">New support request</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <p className="text-sm font-semibold">Seller One</p>
            <p className="text-xs text-green-600">Active now</p>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex">
            <div className="bg-gray-200 p-3 rounded-lg text-sm max-w-md">
              Hello Admin, I need help with my order
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-lg text-sm max-w-md">
              Sure, please share the order ID
            </div>
          </div>

          <div className="flex">
            <div className="bg-gray-200 p-3 rounded-lg text-sm max-w-md">
              Order ID is #AMZ12345
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
