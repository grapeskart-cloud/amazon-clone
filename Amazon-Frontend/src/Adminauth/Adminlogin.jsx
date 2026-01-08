import { Link } from "react-router-dom";

export default function Adminlogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 border rounded-md shadow">
        <h1 className="text-3xl font-semibold mb-6">Admin Sign in</h1>

        <label className="text-sm font-medium">Email or mobile number</label>
        <input className="w-full border p-3 rounded mt-1 mb-4" />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border p-3 rounded mt-1 mb-4"
        />

        <Link to="/admin">
          {" "}
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-medium">
            Sign in
          </button>
        </Link>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-600">
            Forgot password?
          </Link>
          <Link to="/register" className="text-blue-600">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
