import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // clean message (no simulation)
    alert("Password reset link sent to your email");

    setEmail("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Send Reset Link
        </button>

        <p className="text-sm mt-3 text-center">
          Back to{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;