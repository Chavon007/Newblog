import { FormEvent, useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // <-- Add loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in both fields");
      return;
    }

    setLoading(true); // <-- Start loading
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Login failed");
        setLoading(false); // <-- Stop loading
        return;
      }

      setSuccessMessage("Login Successful");

      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              disabled={loading} // <-- Disable input while loading
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              disabled={loading} // <-- Disable input while loading
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading} // <-- Disable button while loading
          >
            {loading ? "Logging in..." : "Log in"} {/* <-- Show loading text */}
          </button>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
