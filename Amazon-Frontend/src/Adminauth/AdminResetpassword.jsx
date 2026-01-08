import { Link } from "react-router-dom";

export default function AdminResetpass() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 border rounded-md shadow">
        <h1 className="text-3xl font-semibold mb-6">Reset Password</h1>

        <label className="text-sm font-medium">New password</label>
        <input
          type="password"
          className="w-full border p-3 rounded mt-1 mb-4"
        />

        <label className="text-sm font-medium">Confirm password</label>
        <input
          type="password"
          className="w-full border p-3 rounded mt-1 mb-6"
        />

        <Link
          to="/"
          className="block text-center bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-medium"
        >
          Save & Login
        </Link>
      </div>
    </div>
  );
}
