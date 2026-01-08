import { Link } from "react-router-dom";

export default function AdminForgotpassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 border rounded-md shadow">
        <h1 className="text-3xl font-semibold mb-6">Password Assistance</h1>

        <label className="text-sm font-medium">Email or mobile number</label>
        <input className="w-full border p-3 rounded mt-1 mb-6" />

        <Link
          to="/send-otp"
          className="block text-center bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-medium"
        >
          Continue
        </Link>

        <p className="text-sm mt-4 text-center">
          <Link to="/" className="text-blue-600">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
