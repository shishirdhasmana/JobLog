import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

async function handleRoute(username, email, password) {
  let item = { username, email, password };
  try {
    let result = await fetch("http://localhost:3000/api/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error("Backend is offline");
  }
}

function Register({ logedIn, setLogIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("typing");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await handleRoute(username, email, password);
      if (res.success == true) {
        setStatus("success");
        console.log("Login Successful");
        setLogIn(true);
        navigate("/login");
      } else {
        throw new Error(res.message || "Invalid email or password");
      }
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        {/* <Logo className="mb-8" /> */}
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-500 mb-8">
          Start tracking your applications today
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col gap-4"
        >
          <span className="text-sm font-medium text-gray-700">Username</span>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
            placeholder="username123"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            disabled={logedIn || status === "submitting"}
          />
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={logedIn || status === "submitting"}
          />
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={logedIn || status === "submitting"}
          />
          <button
            className="mt-2 w-full rounded-xl bg-black text-white py-3 font-medium hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={
              logedIn ||
              email.length == 0 ||
              password.length < 6 ||
              status === "submitting"
            }
          >
            Create Account
          </button>
          {error !== null && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
          <p>Already have an account?</p>
        </form>
      </div>
    </>
  );
}

export default Register;
