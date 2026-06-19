import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email === "admin@dellut.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 bg-[#1a1a1a]">
        <img src={logo} alt="Dellut Engenharia" className="w-80" />
        <div className="mt-10 text-center">
          <p className="text-white/90 text-xl font-light tracking-widest uppercase">
            Gestão de Veículos
          </p>
          <div className="mt-4 w-12 h-0.5 bg-[#CC0000] mx-auto" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex justify-center">
            <img src={logo} alt="Dellut Engenharia" className="w-52" />
          </div>

          <h2 className="text-3xl font-semibold text-[#1a1a1a] mb-1">
            Bem-vindo
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Acesse o sistema de reservas de veículos
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                E-mail
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@dellut.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#CC0000] hover:bg-[#a80000] text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide mt-2"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-xs text-gray-300 mt-8">
            Use{" "}
            <span className="text-gray-400 font-medium">admin@dellut.com</span>{" "}
            para o painel administrativo
          </p>
        </div>
      </div>
    </div>
  );
}
