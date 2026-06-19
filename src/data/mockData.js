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

export const costCenters = [
  {
    id: 1,
    code: "CC-001",
    name: "Operações de Campo",
    budget: 15000,
    spent: 8400,
  },
  {
    id: 2,
    code: "CC-002",
    name: "Projetos Especiais",
    budget: 20000,
    spent: 11200,
  },
  { id: 3, code: "CC-003", name: "Manutenção", budget: 10000, spent: 3750 },
];

export const costEntries = [
  {
    id: 1,
    costCenterId: 1,
    costCenter: "Operações de Campo",
    vehicle: "Fiat Strada",
    leader: "Carlos Silva",
    date: "2026-06-20",
    km: 120,
    fuelCost: 180,
    otherCost: 0,
    description: "Visita técnica - Estação Norte",
  },
  {
    id: 2,
    costCenterId: 2,
    costCenter: "Projetos Especiais",
    vehicle: "Volkswagen Amarok",
    leader: "Ana Souza",
    date: "2026-06-20",
    km: 95,
    fuelCost: 142.5,
    otherCost: 50,
    description: "Reunião com cliente - Escritório Regional",
  },
  {
    id: 3,
    costCenterId: 1,
    costCenter: "Operações de Campo",
    vehicle: "Toyota Hilux",
    leader: "Roberto Lima",
    date: "2026-06-18",
    km: 210,
    fuelCost: 315,
    otherCost: 80,
    description: "Inspeção de infraestrutura",
  },
];
