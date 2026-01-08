import { Link } from "react-router-dom";

export default function AdminRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 border rounded-md shadow">
        <h1 className="text-3xl font-semibold mb-6">Create Admin Account</h1>

        <label className="text-sm font-medium">Full name</label>
        <input className="w-full border p-3 rounded mt-1 mb-4" />

        <label className="text-sm font-medium">Mobile number</label>
        <input className="w-full border p-3 rounded mt-1 mb-4" />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border p-3 rounded mt-1 mb-6"
        />

        <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-medium">
          Continue
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
