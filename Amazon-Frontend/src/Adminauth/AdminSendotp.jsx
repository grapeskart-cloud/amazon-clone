import { Link } from "react-router-dom";

export default function AdminSendotp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 border rounded-md shadow">
        <h1 className="text-3xl font-semibold mb-6">Verify OTP</h1>

        <label className="text-sm font-medium">Enter OTP</label>
        <input className="w-full border p-3 rounded mt-1 mb-6 text-center tracking-widest" />

        <Link
          to="/reset-password"
          className="block text-center bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-medium"
        >
          Verify OTP
        </Link>
      </div>
    </div>
  );
}
