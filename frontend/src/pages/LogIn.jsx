import React, { useState } from "react";
import Logo from "../components/navBar/Logo";

async function handleRoute(email, password) {
  return 1;
}

function LogIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("typing");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      await handleRoute(email, password);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        {/* <Logo className="mb-8" /> */}
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Sign into your account to continue</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col gap-4"
        >
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={status === "submitting"}
          />
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={status === "submitting"}
          />
          <button
          className="mt-2 w-full rounded-xl bg-black text-white py-3 font-medium hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={
              email.length == 0 ||
              password.length < 6 ||
              status === "submitting"
            }
          >
            Login
          </button>
          {error !== null && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
          <p>Don't have an account?</p>
        </form>
      </div>
    </>
  );
}

export default LogIn;
