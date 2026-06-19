import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingContext";
import { costCenters, costEntries } from "../data/mockData";
import logo from "../assets/logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const { bookings, updateStatus } = useBookings();
  const [activeTab, setActiveTab] = useState("reservas");

  const confirmed = bookings.filter((b) => b.status === "confirmado").length;
  const pending = bookings.filter((b) => b.status === "pendente").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img src={logo} alt="Dellut Engenharia" className="h-10" />
        <div className="flex items-center gap-4">
          <span className="text-xs bg-[#CC0000] text-white px-2.5 py-1 rounded-full font-medium">
            Administrador
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-[#CC0000] hover:underline"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">
            Painel Administrativo
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Gerencie reservas e centros de custo
          </p>
        </div>

        {/* Abas */}
        <div className="flex gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab("reservas")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "reservas"
                ? "bg-[#CC0000] text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveTab("custos")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "custos"
                ? "bg-[#CC0000] text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Centro de Custos
          </button>
        </div>

        {/* Aba Reservas */}
        {activeTab === "reservas" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-400">Total de Reservas</p>
                <p className="text-3xl font-bold text-[#1a1a1a] mt-1">
                  {bookings.length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-400">Confirmadas</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {confirmed}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-400">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">
                  {pending}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-[#1a1a1a]">
                  Todas as Reservas
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="text-left px-6 py-3">Veículo</th>
                      <th className="text-left px-6 py-3">Líder</th>
                      <th className="text-left px-6 py-3">Centro de Custo</th>
                      <th className="text-left px-6 py-3">Data</th>
                      <th className="text-left px-6 py-3">Horário</th>
                      <th className="text-left px-6 py-3">Destino</th>
                      <th className="text-left px-6 py-3">Status</th>
                      <th className="text-left px-6 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-[#1a1a1a]">
                          {booking.vehicle}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.leader}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.costCenterCode
                            ? `${booking.costCenterCode} — ${booking.costCenter}`
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.startTime} – {booking.endTime}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.destination}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              booking.status === "confirmado"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "recusado"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {booking.status === "pendente" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "confirmado")
                                }
                                className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Aprovar
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "recusado")
                                }
                                className="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Recusar
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Aba Centro de Custos */}
        {activeTab === "custos" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {costCenters.map((cc) => {
                const percent = Math.round((cc.spent / cc.budget) * 100);
                const isAlert = percent >= 80;

                return (
                  <div
                    key={cc.id}
                    className="bg-white rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        {cc.code}
                      </p>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isAlert
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {percent}%
                      </span>
                    </div>
                    <p className="font-semibold text-[#1a1a1a] mb-3">
                      {cc.name}
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isAlert ? "bg-[#CC0000]" : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>
                        Gasto:{" "}
                        <span className="text-gray-700 font-medium">
                          R$ {cc.spent.toLocaleString("pt-BR")}
                        </span>
                      </span>
                      <span>
                        Orçamento:{" "}
                        <span className="text-gray-700 font-medium">
                          R$ {cc.budget.toLocaleString("pt-BR")}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-[#1a1a1a]">
                  Lançamentos de Custo
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="text-left px-6 py-3">Data</th>
                      <th className="text-left px-6 py-3">Centro de Custo</th>
                      <th className="text-left px-6 py-3">Veículo</th>
                      <th className="text-left px-6 py-3">Líder</th>
                      <th className="text-left px-6 py-3">KM</th>
                      <th className="text-left px-6 py-3">Combustível</th>
                      <th className="text-left px-6 py-3">Outros</th>
                      <th className="text-left px-6 py-3">Total</th>
                      <th className="text-left px-6 py-3">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {costEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-600">
                          {entry.date}
                        </td>
                        <td className="px-6 py-4 font-medium text-[#1a1a1a]">
                          {entry.costCenter}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {entry.vehicle}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {entry.leader}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {entry.km} km
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          R${" "}
                          {entry.fuelCost.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          R${" "}
                          {entry.otherCost.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#1a1a1a]">
                          R${" "}
                          {(entry.fuelCost + entry.otherCost).toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 },
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {entry.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
