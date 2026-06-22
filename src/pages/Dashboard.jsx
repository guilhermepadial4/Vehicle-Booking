import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicles } from "../data/mockData";
import { useBookings } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const { currentUser, logout } = useAuth();

  const dailyBookings = bookings.filter(
    (b) => selectedDate >= b.startDate && selectedDate <= b.endDate,
  );

  const getVehicleBooking = (vehicleId) => {
    return dailyBookings.find((b) => b.vehicleId === vehicleId) || null;
  };

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img src={logo} alt="Dellut Engenharia" className="h-10" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{currentUser?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-[#CC0000] hover:underline"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]">
              Disponibilidade de Veículos
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Consulte e faça sua reserva
            </p>
          </div>
          <button
            onClick={() => navigate("/nova-reserva")}
            className="bg-[#CC0000] hover:bg-[#a80000] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            + Nova Reserva
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600">
            Selecionar data:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {vehicles.map((vehicle) => {
            const booking = getVehicleBooking(vehicle.id);
            const isOccupied = !!booking;

            return (
              <div
                key={vehicle.id}
                className={`bg-white rounded-xl border p-5 transition-all ${
                  isOccupied
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isOccupied
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isOccupied ? "Ocupado" : "Disponível"}
                  </span>
                  <span className="text-xs text-gray-400">{vehicle.plate}</span>
                </div>

                <h3 className="font-semibold text-[#1a1a1a] mb-1">
                  {vehicle.name}
                </h3>

                {isOccupied ? (
                  <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                    <p>👤 {booking.leader}</p>
                    <p>
                      📅 {booking.startDate} → {booking.endDate}
                    </p>
                    <p>
                      🕐 {booking.startTime} – {booking.endTime}
                    </p>
                    <p>📍 {booking.destination}</p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">
                    Livre para reserva nesta data
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-[#1a1a1a] mb-4">Reservas do dia</h2>
          {dailyBookings.length === 0 ? (
            <p className="text-sm text-gray-400">
              Nenhuma reserva para esta data.
            </p>
          ) : (
            <div className="space-y-3">
              {dailyBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      {booking.vehicle}
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.leader} · {booking.startDate} → {booking.endDate}{" "}
                      · {booking.startTime} – {booking.endTime} ·{" "}
                      {booking.destination}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      booking.status === "confirmado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
