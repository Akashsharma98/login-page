import { useState } from "react";

function App() {
  const [page, setPage] = useState("signup");
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://studily-backend-956312854595.asia-south1.run.app/roomc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      setMessage(data?.success ? "✅ Signup successful" : "❌ " + (data?.message || "Signup failed"));
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://studily-backend-956312854595.asia-south1.run.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      setMessage(data?.success ? "✅ Login successful" : "❌ " + (data?.message || "Login failed"));
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      // style={{ backgroundImage: "url('/public/images/Bluetooth-Controlled-Robot-1 last.jpg')," }}
       style={{
    backgroundImage: "url('/images/Bluetooth-Controlled-Robot-1-last.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  }}
    >
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-80 rounded-lg p-6 shadow-lg w-[90%] max-w-sm">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setPage("signup")}
            className={`px-4 py-2 rounded ${page === "signup" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Signup
          </button>
          <button
            onClick={() => setPage("login")}
            className={`px-4 py-2 rounded ${page === "login" ? "bg-green-600 text-white" : "bg-gray-300"}`}
          >
            Login
          </button>
        </div>

        {page === "signup" ? (
          <form onSubmit={handleSignup} className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-center">Signup</h2>
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleSignupChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleSignupChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleSignupChange}
              required
              className="w-full border p-2 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleLoginChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleLoginChange}
              required
              className="w-full border p-2 rounded"
            />
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Login</button>
          </form>
        )}

        {message && <p className="mt-4 text-sm font-semibold text-center">{message}</p>}
      </div>
    </div>
  );
}

export default App;
