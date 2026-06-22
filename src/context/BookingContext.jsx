import { createContext, useContext, useState } from "react";
import { bookings as initialBookings } from "../data/mockData";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(initialBookings);

  function hasConflict(newBooking) {
    return bookings.some((b) => {
      if (b.vehicleId !== newBooking.vehicleId) return false;
      if (b.status === "recusado") return false;

      const newStart = new Date(newBooking.startDate);
      const newEnd = new Date(newBooking.endDate);
      const existingStart = new Date(b.startDate);
      const existingEnd = new Date(b.endDate);

      return newStart <= existingEnd && newEnd >= existingStart;
    });
  }

  function addBooking(booking) {
    if (hasConflict(booking)) {
      return {
        success: false,
        message: "Este veículo já possui uma reserva nesse período.",
      };
    }

    const newBooking = {
      ...booking,
      id: bookings.length + 1,
      status: "pendente",
    };
    setBookings((prev) => [...prev, newBooking]);
    return { success: true };
  }

  function updateStatus(id, status) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateStatus }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
