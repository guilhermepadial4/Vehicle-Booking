import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicles, leaders, costCenters } from "../data/mockData";
import { useBookings } from "../context/BookingContext";
import logo from "../assets/logo.png";

export default function NewBooking() {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [form, setForm] = useState({
    vehicleId: "",
    leaderId: "",
    costCenterId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    destination: "",
    purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setDateError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.endDate < form.startDate) {
      setDateError(
        "A data de chegada não pode ser anterior à data de partida.",
      );
      return;
    }

    const vehicle = vehicles.find((v) => v.id === parseInt(form.vehicleId));
    const leader = leaders.find((l) => l.id === parseInt(form.leaderId));
    const costCenter = costCenters.find(
      (c) => c.id === parseInt(form.costCenterId),
    );

    addBooking({
      vehicleId: parseInt(form.vehicleId),
      vehicle: vehicle.name,
      leader: leader.name,
      costCenterId: parseInt(form.costCenterId),
      costCenter: costCenter.name,
      costCenterCode: costCenter.code,
      startDate: form.startDate,
      endDate: form.endDate,
      startTime: form.startTime,
      endTime: form.endTime,
      destination: form.destination,
      purpose: form.purpose,
    });

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

            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Centro de Custo
              </label>
              <select
                name="costCenterId"
                value={form.costCenterId}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000] bg-white"
              >
                <option value="">Selecione o centro de custo</option>
                {costCenters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Data de Partida
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Data de Chegada
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  min={form.startDate}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
                />
              </div>
            </div>

            {dateError && <p className="text-xs text-red-500">{dateError}</p>}

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
