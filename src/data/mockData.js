export const vehicles = [
  { id: 1, name: "Fiat Strada", plate: "ABC-1234", status: "disponível" },
  { id: 2, name: "Volkswagen Amarok", plate: "DEF-5678", status: "disponível" },
  { id: 3, name: "Toyota Hilux", plate: "GHI-9012", status: "disponível" },
];

export const bookings = [
  {
    id: 1,
    vehicleId: 1,
    vehicle: "Fiat Strada",
    leader: "Carlos Silva",
    date: "2026-06-20",
    startTime: "08:00",
    endTime: "12:00",
    destination: "Estação de Tratamento Norte",
    purpose: "Visita técnica",
    status: "confirmado",
  },
  {
    id: 2,
    vehicleId: 2,
    vehicle: "Volkswagen Amarok",
    leader: "Ana Souza",
    date: "2026-06-20",
    startTime: "13:00",
    endTime: "17:00",
    destination: "Escritório Regional",
    purpose: "Reunião com cliente",
    status: "pendente",
  },
];

export const leaders = [
  { id: 1, name: "Carlos Silva", role: "Líder de Campo" },
  { id: 2, name: "Ana Souza", role: "Líder de Projetos" },
  { id: 3, name: "Roberto Lima", role: "Líder de Manutenção" },
];
