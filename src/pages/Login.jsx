import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Dellut Engenharia" className="h-14" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h1 className="text-xl font-semibold text-[#1a1a1a] mb-1">
            Bem-vindo
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Acesse o sistema de reservas
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-500">⚠️ {error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#CC0000] hover:bg-[#a80000] text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              Entrar
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Dellut Engenharia © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
