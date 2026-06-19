import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicles, leaders } from "../data/mockData";
import logo from "../assets/logo.png";

export default function NewBooking() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    vehicleId: "",
    leaderId: "",
    date: "",
    startTime: "",
    endTime: "",
    destination: "",
    purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">
            Reserva Solicitada!
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Sua solicitação foi enviada e está aguardando aprovação do
            administrador.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#CC0000] hover:bg-[#a80000] text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img src={logo} alt="Dellut Engenharia" className="h-10" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-[#CC0000] transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">
            Nova Reserva
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Preencha os dados para solicitar um veículo
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Veículo */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Veículo
              </label>
              <select
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] bg-white"
              >
                <option value="">Selecione um veículo</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.plate}
                  </option>
                ))}
              </select>
            </div>

            {/* Líder */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Líder Responsável
              </label>
              <select
                name="leaderId"
                value={form.leaderId}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] bg-white"
              >
                <option value="">Selecione o líder</option>
                {leaders.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Data
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
              />
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Horário de Saída
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Horário de Retorno
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
                />
              </div>
            </div>

            {/* Destino */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Destino
              </label>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Ex: Estação de Tratamento Norte"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
              />
            </div>

            {/* Finalidade */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Finalidade
              </label>
              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Descreva brevemente o motivo da viagem..."
                required
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#CC0000] hover:bg-[#a80000] text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              Solicitar Reserva
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
