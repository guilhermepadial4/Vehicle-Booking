import { createContext, useContext, useState } from "react";
import { bookings as initialBookings } from "../data/mockData";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(initialBookings);

  function addBooking(booking) {
    const newBooking = {
      ...booking,
      id: bookings.length + 1,
      status: "pendente",
    };
    setBookings((prev) => [...prev, newBooking]);
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
