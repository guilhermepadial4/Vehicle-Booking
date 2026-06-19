import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookings, vehicles } from "../data/mockData";
import logo from "../assets/logo.png";

export default function Admin() {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState(bookings);

  function handleStatus(id, newStatus) {
    setBookingList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  }

  const confirmed = bookingList.filter((b) => b.status === "confirmado").length;
  const pending = bookingList.filter((b) => b.status === "pendente").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
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

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">
            Painel Administrativo
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Gerencie as solicitações de reserva
          </p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-400">Total de Reservas</p>
            <p className="text-3xl font-bold text-[#1a1a1a] mt-1">
              {bookingList.length}
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
            <p className="text-3xl font-bold text-yellow-500 mt-1">{pending}</p>
          </div>
        </div>

        {/* Tabela de reservas */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#1a1a1a]">Todas as Reservas</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="text-left px-6 py-3">Veículo</th>
                  <th className="text-left px-6 py-3">Líder</th>
                  <th className="text-left px-6 py-3">Data</th>
                  <th className="text-left px-6 py-3">Horário</th>
                  <th className="text-left px-6 py-3">Destino</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookingList.map((booking) => (
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
                    <td className="px-6 py-4 text-gray-600">{booking.date}</td>
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
                      {booking.status === "pendente" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatus(booking.id, "confirmado")
                            }
                            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleStatus(booking.id, "recusado")}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Recusar
                          </button>
                        </div>
                      )}
                      {booking.status !== "pendente" && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
